//listeners

eventListeners();

function eventListeners() {

  btnAddTime.addEventListener('click',ui.addNewTime);
  btnSubmit.addEventListener('click', (e)=>{desarForm(e,ui)},);  
  emisorasForm.addEventListener('submit', (e)=>{radio.addEmisora(e)});

  document.addEventListener('DOMContentLoaded',()=>{
    //cargamos datos guardados...
  
    ui.configs = JSON.parse(localStorage.getItem('configs')) || [];
    ui.emisorasHTML(radio.emisoras);
    ui.programacioHTML();
    
    setInterval(function(){
      const config = radio.comprovarProgramacio(ui.configs);
      if(config!=false){        
        radio.mostrar(config);
      }else{        
        radio.amagar();
      }
    },5000);
  
  });
}





// setInterval(function() {
//     if (script) {
//         // Remover el script del DOM
//         document.body.removeChild(script);
//         script = null;
//         console.log('Script eliminado');
//     }
// },40000);


//funciones

// Ejemplo de uso: clic en las coordenadas (100, 200)


