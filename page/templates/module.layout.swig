{% extends '<%= rootDir %>base.swig' %}

{# Provides layout level markup #}
{% block layout %}
<div class="layout-wrapper <%= _.slugify(name.toLowerCase()) %>">
  {% block content %}{% endblock %}
</div>
{% endblock %}
