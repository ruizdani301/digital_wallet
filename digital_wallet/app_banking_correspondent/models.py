from django.db import models

class Usuario(models.Model):
    cedula = models.CharField(max_length=20)
    codigo_validacion = models.CharField(max_length=10)

    def __str__(self):
        return self.cedula
