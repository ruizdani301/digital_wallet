from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class BalanceDetail(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                related_name='user_balance',
                                on_delete=models.CASCADE)
    balance = models.DecimalField(
        'saldo', max_digits=10, decimal_places=2)
    deposit_date = models.DateTimeField('fecha_deposito', auto_now_add=True)

    class Meta:
        db_table = 'BalanceDetail'

    def __str__(self):
        return f'{self.user} {self.balance} {self.deposit_date}'



class Transaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             related_name='user_transa',
                             on_delete=models.CASCADE)
    transaction_date = models.DateTimeField('fecha_trasaccion',
                                            auto_now_add=True)
    # decula de quien recibe
    reference = models.CharField('referencia', max_length=50, blank=True, null=True)
    reference_name = models.CharField('nombre', max_length=50, null=True, blank=True)
    amount = models.DecimalField('cantidad', max_digits=10, decimal_places=2)
    details = models.TextField(max_length=200, null=True, blank=True)
    transaction_type = models.CharField('category', max_length=50)

    class Meta:
        db_table = 'Transaction'

    def __str__(self):
        return f'{self.user} {self.transaction_date} {self.amount}'


class withdrawal(models.Model):
    """
        Ejemplo de JSON de entrada:
       {
            "code_validation": "123456",
            "identification_number": "ABC123",
            "value": 100.00
            "token": "dfsfsdafadsfasdfasfasdfasdfasdfasdfsgfhfg345df"
        } 
    """

    code_validation = models.TextField(max_length=200)
    identification_number = models.CharField(max_length=20, null=False)
    value = models.DecimalField('cantidad', max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'withdrawal'

    def __str__(self): 
        return f'{self.code_validation}'
    
