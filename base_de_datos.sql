CREATE TABLE IF NOT EXISTS visitantes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150),
    rol VARCHAR(50) DEFAULT 'Estudiante',
    comentario TEXT,
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS obras (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    autor VARCHAR(100) DEFAULT 'Estudiantes Colegio Tom Adams',
    categoria VARCHAR(50) NOT NULL,
    anio_creacion INT DEFAULT 2024,
    archivo_3d_url TEXT NOT NULL,
    imagen_previa_url TEXT,
    fecha_publicacion TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS eventos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    lugar VARCHAR(150),
    fecha_evento DATE NOT NULL,
    imagen_url TEXT,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS reconocimientos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    entidad_otorgante VARCHAR(100) NOT NULL,
    monto_incentivo DECIMAL(10,2) DEFAULT 0.00,
    anio INT NOT NULL,
    descripcion TEXT
);

INSERT INTO eventos (titulo, tipo, descripcion, lugar, fecha_evento) VALUES
('Día de las Manos Rojas', 'Fecha Conmemorativa', 'Jornada contra el reclutamiento infantil y en favor de la paz.', 'Colegio Tom Adams IED', '2026-02-12'),
('Día de la Memoria y Solidaridad con las Víctimas', 'Fecha Conmemorativa', 'Homenaje a las víctimas del conflicto armado.', 'Colegio Tom Adams IED', '2026-04-09'),
('Visita al CMPR y Cervecería La Roja', 'Salida Pedagógica', 'Recorrido por el Centro de Memoria, Paz y Reconciliación.', 'Centro Histórico Bogotá', '2022-10-15'),
('Visita al Museo de la Ciudad Autoconstruida', 'Salida Pedagógica', 'Reconocimiento de las memorias comunitarias en Ciudad Bolívar.', 'Ciudad Bolívar', '2023-09-20'),
('Visita a la Casa de Memoria MAFAPO', 'Salida Pedagógica', 'Encuentro con las Madres de Falsos Positivos.', 'Bogotá', '2024-05-18');

INSERT INTO reconocimientos (titulo, entidad_otorgante, monto_incentivo, anio, descripcion) VALUES
('Gala de los Mejores 2023', 'Secretaría de Educación del Distrito (SED)', 3800000.00, 2023, 'Premio en categoría El colegio, la Comunidad y la Ciudad.'),
('Incentivo Semilleros de Paz', 'Alcaldía Local de Kennedy', 7600000.00, 2024, 'Apoyo al acompañamiento pedagógico de estudiantes construyendo paz.'),
('Entornos Escolares Inspiradores', 'Alcaldía Mayor de Bogotá', 0.00, 2025, 'Categoría 5: Aliados por un entorno inspirador.');

INSERT INTO obras (titulo, descripcion, categoria, archivo_3d_url) VALUES
('Máscara de Sanación y Conflicto', 'Obra en yeso que representa las expresiones corporales de memoria y dolor.', 'Máscara', 'modelos/mascara_sanacion.glb');

