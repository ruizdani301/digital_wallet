from .forms import UsuarioForm 
from django.views.generic import FormView
from django.urls import reverse_lazy
from app_user.models import *
import requests
#from app_wallet.models import User


class backing_corresponsal(FormView):

    template_name = 'formulario.html'
    form_class = UsuarioForm
    success_url = reverse_lazy('bancking:corresponsalbancario')
    global url_base
    url_base = "https://jc123.pythonanywhere.com"
    def form_valid(self, form):
        identification_number = form.cleaned_data['cedula'],
        value =form.cleaned_data['codigo_validacion']
        selected_option = self.request.POST.get('opcion', 'recarga')

        if selected_option == 'recarga':
            self.query_reload(identification_number,value)

        elif selected_option == 'retiro':
            self.querywithdrawals(identification_number,value)

        return super(backing_corresponsal, self).form_valid(form)
    

    def query_reload(self, identification_number, value):
            global url_base
            print('Se seleccionó Recarga')
            usuario = User.objects.filter(identification_number=identification_number[0]).values('id', 'name').first()
            url = url_base + "/api/v1/recarga/"
            if usuario:
                response = requests.post(url, json={"identification": identification_number[0], "reload": int(value)})
                
                if response.status_code == 201:
                    # new_balance = BalanceDetail.objects.get(user_id=usuario["id"])
                    # new_balance.balance = (new_balance.balance + int(value))
                    # new_balance.save()
                    print('Recarga exitosa')
                else:
                    print('Error en la recarga ')
                    print(response)
            else:
                print('Usuario no encontrado')


    def querywithdrawals(self, identification_number, code_validation):
            global url_base

            print('Se seleccionó retiro')
            url = url_base + "/api/v1/corresponsalretiro/"

            usuario = User.objects.filter(identification_number=identification_number[0]).values('id', 'name').first()
            response = requests.post(url, json={"identification_number": identification_number[0], "code_validation": code_validation})
                
            if response.status_code == 201 or response.status_code == 200:
                print('retiro exitosa')
                response_data = response.json()
                print(response_data)


            else:
                print('Error en el retiro ')
                print(response)

