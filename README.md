#Plataforma de Gestión para Organización Sin Fines de Lucro
  
Autores: Juan Silgado, Miguel Villa, Dylan Ecker  
Fecha: 23 de abril de 2025  
Universidad Tecnológica de Bolívar

##Descripción

Este proyecto tiene como objetivo desarrollar una plataforma unificada para la gestión de datos de una organización sin fines de lucro, integrando donantes, voluntarios y programas. Se trata de una solución moderna basada en microservicios y tecnologías en la nube, orientada a mejorar la administración, coordinación y toma de decisiones mediante analítica avanzada.

##Características principales

- Arquitectura de microservicios.
- API Gateway para centralizar el acceso a servicios.
- Almacenamiento en Data Warehouse en la nube.
- Sistema de analítica avanzada con dashboard interactivo.
- Interfaces para administración, visualización y análisis de datos.

##Clases de usuarios

- **Administradores:** Gestión de usuarios, roles, reportes.
- **Coordinadores de voluntarios:** Asignación y seguimiento de actividades.
- **Donantes:** Visualización de historial e impacto de donaciones.

##Requisitos de seguridad

- Cifrado de datos en tránsito (TLS 1.2/1.3) y en reposo (AES-256).
- Auditorías de seguridad periódicas.
- Cumplimiento con GDPR y normas como ISO/IEC 27001.

##Rendimiento y escalabilidad

- Baja latencia en APIs (< 200 ms).
- Procesamiento de grandes volúmenes de datos (hasta 10,000 registros/minuto).
- Alta disponibilidad con despliegue multi-AZ.
- Escalabilidad horizontal y vertical con Docker + Kubernetes.

##Requisitos funcionales destacados

- Registro, consulta, edición y eliminación lógica de donantes y voluntarios.
- Asociación de actividades y campañas.
- Historial de auditoría para trazabilidad.
- Filtros, exportación de datos y control de acceso basado en roles.

##Interfaces

- Web app con panel de administración responsivo.
- Dashboard con métricas clave (usuarios, donaciones, eventos).
- Integración con plataformas de pago y CRM.
- API Gateway para gestión centralizada y segura de servicios.

##Documentación

- Manual para usuarios administrativos y coordinadores.
- Guía de integración para desarrolladores externos.

##MVP (Producto Mínimo Viable)

- Microservicios para módulos clave.
- API Gateway para control de acceso.
- Dashboard interactivo para métricas clave.
- Infraestructura en la nube para datos y análisis.

##Requisitos técnicos

- Acceso a internet.
- Navegadores modernos (compatibilidad mobile-first).
- Servicios en la nube: AWS, Azure o Google Cloud.

##Historial de versiones

| Versión | Fecha       | Cambios principales                                           |
|---------|-------------|---------------------------------------------------------------|
| 0.1     | 16/03/25    | Documentación inicial del proyecto                            |
| 0.2     | 16/03/25    | Documentación inicial del MVP                                 |
| 2.0     | 22/03/25    | Actualización                                                 |
| 3.0     | 23/04/25    | Arquitectura completa, interfaz, MVP y actualización de requisitos |

##Licencia

Este proyecto es parte de un trabajo académico de la Universidad Tecnológica de Bolívar. Su uso está limitado a fines educativos.

# CodeForGood
