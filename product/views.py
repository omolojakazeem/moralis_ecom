from django.shortcuts import render
from django.views import View
from . import models


class Index(View):
    template = 'product/index.html'

    def get(self, request):
        products = models.Product.objects.all()
        context = {
            'products': products
        }
        return render(request, template_name=self.template, context=context)