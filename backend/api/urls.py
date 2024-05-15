from django.urls import path
from . import views

urlpatterns = [
    path("stocks/", views.StockListCreate.as_view(), name="stock-list"),
    path("stocks/delete/<int:pk>/", views.StockDelete.as_view(), name="delete-stock"),
]