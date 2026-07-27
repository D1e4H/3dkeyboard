3D Mechanical Keyboard Customizer

Una aplicación web interactiva en 3D para personalizar y pintar componentes de un teclado mecánico en tiempo real, construida con React, React Three Fiber (R3F), Drei, Tailwind CSS y TypeScript.
Características Principales

    Visualizador 3D Interactivo: Renderizado optimizado de modelos 3D (.glb) utilizando Three.js.

    Pintura por Click: Selección de colores mediante un panel flotante y aplicación directa sobre las mallas o sub-materiales específicos del teclado.

    Historial de Cambios (Undo / Redo): Sistema completo de control de versiones por acciones de pintado mediante atajos de teclado estándar:

        Deshacer: Ctrl + Z (o Cmd + Z en Mac)

        Rehacer: Ctrl + Y o Ctrl + Shift + Z

    Optimización de Rendimiento:

        Uso de frustumCulled y clonación eficiente de materiales.

        Precarga de modelos (useGLTF.preload) para evitar bloqueos repentinos.

        Configuración de renderizado optimizada (desactivación de sombras innecesarias y control de DPR).

    Feedback Visual: Cursor interactivo (pointer) al pasar el ratón sobre los elementos modificables del modelo 3D.

Tecnologías Utilizadas

    Framework: React (Next.js / Client Components)

    Tipado: TypeScript

    3D / Gráficos: Three.js, React Three Fiber, @react-three/drei

    Estilos: Tailwind CSS

Estructura del Componente

El proyecto se divide principalmente en dos componentes lógicos:

    Model: Gestiona la carga del archivo GLTF, la manipulación de materiales, la lógica de eventos de clic para pintar y los listeners del historial de comandos (Undo/Redo).

    KeyBoardScene: Configura el proveedor de contexto de color (ColorContext), el componente Canvas de Three.js, la iluminación de entorno (Stage) y los controles orbitales de la cámara (OrbitControls).
