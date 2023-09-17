from rest_framework import serializers
from ..models import *
from datetime import datetime



class BalanceDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BalanceDetail
        fields = '__all__'


class BalanceSerializer(serializers.Serializer):
    balance = serializers.DecimalField(max_digits=10, decimal_places=2)
    user__name = serializers.CharField()
    user__uuid_user = serializers.CharField()


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['user', 'amount', 'details', 'transaction_type', 'reference', 'reference_name']


""" Calcula y modifica la fecha en el serializador """
class TransactionReportSerializer(serializers.ModelSerializer):
    new_date = serializers.SerializerMethodField()
    class Meta:
        model = Transaction
        fields = ['reference_name',
                  'reference',
                  'transaction_type',
                  'amount',
                  'transaction_date',
                  'new_date'
                  ]
    def get_new_date(self, obj):
        original_date_str = str(obj.transaction_date)
        date_str =  original_date_str.split(".")
        parser_date = datetime.strptime(date_str[0], "%Y-%m-%d %H:%M:%S")
        new_date_parser = parser_date.strftime("%d-%m-%Y %H:%M:%S")
        return new_date_parser
    
        
        

class ReloadSerializer(serializers.Serializer):
    reload = serializers.DecimalField(max_digits=10, decimal_places=2)
    identification = serializers.CharField()


class withdrawalSerializer(serializers.ModelSerializer):
    class Meta:
        model = withdrawal
        fields = ['identification_number', 'value']


class withdrawalBalanceDetailSerializer(serializers.Serializer):
    identification_number = serializers.CharField()
    code_validation = serializers.CharField()

