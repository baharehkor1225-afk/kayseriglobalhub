type GLTFScene = {
  scene: {
    clone: (recursive?: boolean) => any
    position: {
      x: number
      y: number
      z: number
    }
  }
}

function loadGltfModel(loader: any, url: string): Promise<GLTFScene> {
  return new Promise((resolve, reject) => {
    const onProgress = undefined
    const onError = (error: unknown) => {
      const message = error instanceof Error ? error.message : String(error)
      if (message.includes('403') || message.includes('404')) {
        reject(new Error(`Failed to load 3D model from ${url}. File may not exist or access denied.`))
      } else if (message.includes('CORS')) {
        reject(new Error(`CORS error loading model from ${url}. Server may not support cross-origin requests.`))
      } else {
        reject(new Error(`Error loading model from ${url}: ${message}`))
      }
    }
    
    try {
      loader.load(url, (gltf: GLTFScene) => resolve(gltf), onProgress, onError)
    } catch (error) {
      onError(error)
    }
  })
}

export async function mergeGlbModels(modelUrls: string[]): Promise<string> {
  if (!modelUrls.length) {
    throw new Error('No models provided for merge.')
  }

  let Scene: any, Box3: any, Vector3: any, GLTFLoader: any, GLTFExporter: any

  try {
    const threeImports = await Promise.all([
      import('three'),
      import('three/examples/jsm/loaders/GLTFLoader.js'),
      import('three/examples/jsm/exporters/GLTFExporter.js'),
    ])
    ;({ Scene, Box3, Vector3 } = threeImports[0])
    ;({ GLTFLoader } = threeImports[1])
    ;({ GLTFExporter } = threeImports[2])
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to load Three.js modules for model merging: ${message}`)
  }

  const loader = new GLTFLoader()
  const exporter = new GLTFExporter()
  const mergedScene = new Scene()

  let xOffset = 0
  const spacing = 0.35

  for (let i = 0; i < modelUrls.length; i++) {
    const url = modelUrls[i]
    try {
      const gltf = await loadGltfModel(loader, url)
      const clonedScene = gltf.scene.clone(true)

    const bounds = new Box3().setFromObject(clonedScene)
    const size = new Vector3()
    const center = new Vector3()
    bounds.getSize(size)
    bounds.getCenter(center)

    const modelWidth = size.x > 0 ? size.x : 0.5

    // Normalize each model around origin and keep base on the floor.
    clonedScene.position.x -= center.x
    clonedScene.position.y -= bounds.min.y
    clonedScene.position.z -= center.z

      // Place models side by side.
      clonedScene.position.x += xOffset
      xOffset += modelWidth + spacing

      mergedScene.add(clonedScene)
    } catch (modelError) {
      console.warn(`Skipping model ${i + 1} (${url}):`, modelError instanceof Error ? modelError.message : String(modelError))
      // Continue with remaining models instead of failing completely
    }
  }

  if (mergedScene.children.length === 0) {
    throw new Error('No models could be successfully loaded. Check URLs and CORS settings.')
  }

  // Re-center merged scene so AR placement is predictable.
  const mergedBounds = new Box3().setFromObject(mergedScene)
  const mergedCenter = new Vector3()
  mergedBounds.getCenter(mergedCenter)
  mergedScene.position.x -= mergedCenter.x
  mergedScene.position.z -= mergedCenter.z

  const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    exporter.parse(
      mergedScene,
      (result: unknown) => {
        if (result instanceof ArrayBuffer) {
          resolve(result)
          return
        }

        reject(new Error('GLTF export did not return a binary GLB payload.'))
      },
      (error: unknown) => reject(error),
      { binary: true }
    )
  })

  const blob = new Blob([arrayBuffer], { type: 'model/gltf-binary' })
  const blobUrl = URL.createObjectURL(blob)
  
  // Mark this URL as a blob so we can handle it specially for iOS
  ;(blobUrl as any).__isBlob = true
  
  return blobUrl
}