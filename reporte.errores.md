# Reporte Error Fase 2


## 1 REPORTE DE ERROR 

Entorno de prueba: ubuntus 
Servicio afectado: apache HTTP 
Documento: Falla de puerto y direccion erronea.

Descripcion: Al introducir una palabra clave o perametro invalida dentro de la estructura del contenedor de configuracion de Apache:

Error ruta: /etc/apache2/sites-available/dulcehogar.local.conf

apache:
<Directory /var/www/dulcehogar.local>
    AllowOverride All
    Require all granded  # <-- Error léxico inducido en la directiva (granded con d)
</Directory>


analisis con apache:
sudo apache2ctl configtest
AH00526: Syntax error on line 7 of /etc/apache2/sites-available/dulcehogar.local.conf:
Unknown Authn provider: all

FINAL SOLUCIONADO:SI 


# Reporte Error Fase 3

## 1 - fase 3 - 
Entorno de prueba: ubuntus 
Servicio afectado: apache HTTP 
Documento: Falla de conexion upstream en REverse Proxy Error HTTP 503 

Descripcion:
al realizar una peticion a la ruta dinamica a travez del puerto configurado en Apache 8085 , el servidor web no reenvio la solicitud hacia el puerto interno 9090 de express. Devolviendo una respuesta de fallo de servicion.

Comando utilizado durante la falla:
` curl "http://dulcehogar.local:8085/api/pedido?cliente=Rodrigo&pastel=TresLeches&fecha=2026-10-30" ` 

Solucion:
el proceso de node.js no estaba en ejecucion en ese isntante , el puerto local se encontraba cerrado probocando que apache devolviera el codigo HTTP 503 Service Unavailable 

FINAL SOLUCIONADO: SI