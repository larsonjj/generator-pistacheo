{% extends 'layouts/base.swig' %}

{% block content %}
<div class="main-container">
  <div class="pistacheo-info">
    <h1>Welcome to Pistacheo!</h1>
    <p>
      Take a look at the <a href="https://github.com/larsonjj/generator-pistacheo#pistacheo-generator---">documentation</a> and start mixing up something awesome.
    </p>
    <p>
      <img src="/images/pistacheo-icon.png" width="75px" class="logo" />
    </p>
  </div>
</div>
<code class="version">v<%= pkg.version %></code>
{% endblock %}
