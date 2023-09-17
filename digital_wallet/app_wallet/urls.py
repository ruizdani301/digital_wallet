"""
URL configuration for digital_wallet project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.contrib.auth import views as auth_views
from .views_api.balance import *
from .views_api.reload_money import *
from .views_api.pay import *
from .views_api.withdrawal import *
from .views_api.cashier import *
from .views_api.reports import *
from .views_api.transaction_withdrawal import TransactionView


urlpatterns = [
    # ... otras URLs ...
    path('api/v1/saldo/<int:id>', BalanceApiView.as_view(), name='balance'),
    path('api/v1/pago/', PayView.as_view(), name='pagos'),
    path('api/v1/recarga/', ReloadMoneyView.as_view(), name='recarga'),
    path('api/v1/retiro/', UserWithdrawal.as_view(), name='retiro'),
    path('api/v1/corresponsalretiro/', CorresponsalWithdrawal.as_view(), name='corresponsalretiro'),
    path('api/v1/reporte/<int:id>', ReportTransaction.as_view(), name='reporte'),
]
