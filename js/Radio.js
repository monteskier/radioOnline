function Radio(audio, video){
  this.audio = audio; 
  this.video = video; 
  this.active = false;
  this.emisoras = JSON.parse(localStorage.getItem('emisoras')) || [];
  //this.allow="play";
}

Radio.prototype.addEmisora =  function(e){
  e.preventDefault();
  nom = emisorasForm.querySelector('#nom_emisora').value;
  url = emisorasForm.querySelector('#url_emisora').value;
  es_video = chk_es_video.checked;

  if(nom.length == 0 && url.length == 0){
    console.log('no hi han dades...');
    return;
  }
  const obj = {
    nom,
    url,
    es_video
  };

  this.emisoras.push(obj);
  ui.emisorasHTML(this.emisoras);
  localStorage.removeItem('emisoras');
  localStorage.setItem('emisoras',JSON.stringify(this.emisoras));
}



Radio.prototype.mostrar = function(config){    
    const id = config.id;    
    if(!this.active){

      console.log("Entramos!");
      //Hacemos visible el spinner del horario que esta activo.
      const tdOnline = document.querySelector(`#programacio-container > table > tbody > tr#tr${id}`).firstChild;
      const primerDiv = tdOnline.querySelector('div');
      primerDiv.style=('display:block');
      const emisora = this.emisoras.find( emi => emi.nom === config.emisora);
      switch(emisora.es_video){
        case true://cas de audio en video
          
          this.video.src = emisora.url;
          this.video.classList.remove('d-none');
          this.video.classList.add('d-block');
          this.video.play();
          break;
        case false://cas de audio en mp3
          this.audio.src=emisora.url;
          this.audio.play(); //en cas que no, posem el src del url la emisora que toca.
          break;
        
        }
        this.active = true;
      
    }
}

Radio.prototype.amagar = function(){
  const trsOnline = document.querySelectorAll(`#programacio-container > table > tbody > tr`);
  trsOnline.forEach((tr)=>{
    const spinner =  tr.firstChild.querySelector('div.cargando');
    spinner.style=('display:none');
  })
    //Amegem els widget video      
    this.video.pause();
    this.video.src = '';
    this.video.classList.remove('d-block');
    this.video.classList.add('d-none');
    
    //Amegem els widget audio
    this.audio.pause();
    this.audio.src='';

    this.active = false;
  
  
}

Radio.prototype.comprovarProgramacio = function (configs){
  //console.log("Hola des de setinterval")

  const avui = moment().isoWeekday();
  
  if(configs.length > 0){
    //todo: canviarlo por for, para poder hacer break;
    for(let i = 0; i < configs.length; i++) {

      const ini = (configs[i].diaInicial);
      const fi = (configs[i].diaFinal);

      //primer comprovem si estem a dia dintre del rang inici i final
      if( avui >= ini && avui <= fi){
        
        //revisar hora
        for(let j=0; j < configs[i].times.length;j++){
          const startTimeString = configs[i].times[j].inici;
          const endTimeString = configs[i].times[j].final;
  
          // Create Date objects using only hours and minutes from the strings
          const startTime = new Date();
          startTime.setHours(parseInt(startTimeString.split(":")[0]));
          startTime.setMinutes(parseInt(startTimeString.split(":")[1]));
  
          const endTime = new Date();
          endTime.setHours(parseInt(endTimeString.split(":")[0]));
          endTime.setMinutes(parseInt(endTimeString.split(":")[1]));
          const ara = new Date().getTime();
          if( startTime <= ara && endTime >= ara){
            //TODO MOSTRAR RADIO
            
            return (configs[i]);                  
            
          }
        }        
        //todo AMAGAR RADIO                
      }
      
    }
    //hem revisats tots els dies i cap dia coincideix amb aviui, apagem la radio
    
    return false;

  }else{    
    return false;
  }
}