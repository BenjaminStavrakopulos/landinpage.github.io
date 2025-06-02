function toggleSection(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById("icon-" + id);
  
    if (content.style.display === "none") {
      content.style.display = "block";
      icon.textContent = "−";
    } else {
      content.style.display = "none";
      icon.textContent = "+";
    }
  }
  
  // Envío de formulario a backend real
  document.getElementById('correo-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
      nombre: formData.get('nombre'),
      correo: formData.get('correo'),
      mensaje: formData.get('mensaje')
    };
  
    try {
      const response = await fetch('https://tu-api.com/enviar-correo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
      document.getElementById('respuesta-servidor').textContent = result.message || "Correo enviado con éxito";
    } catch (error) {
      document.getElementById('respuesta-servidor').textContent = "Error al enviar el mensaje. Intenta nuevamente.";
    }
  });
