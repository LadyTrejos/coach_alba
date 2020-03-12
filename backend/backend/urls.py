from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('coach.api.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^password-reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        TemplateView.as_view(
            template_name="password_reset_confirm.html"),
        name='password_reset_confirm'),
]
