<!DOCTYPE html>

<!--[if lt IE 9]>
<html class="lt-ie9 no-js" lang="en">
<![endif]-->
<!--[if gte IE 9]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->

  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>{{ pistacheo.title }}</title>
    <meta name="description" content="{{ pistacheo.description }}"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    {# CSRF token for form submissions #}
    <meta name="csrf-token" content="{{_csrf}}" />

    <link rel="stylesheet" href="styles/main.css"/>
  </head>
  <body>
    <!--[if lt IE 9]>
    <p class="browsehappy">
      You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.
    </p>
    <![endif]-->

    {% block content %}{% endblock %}

    <script src="scripts/main.js"></script>
  </body>
</html>
