var app = new Vue({

  el: '#neko',

  data: {
    title: 'Adivinanzas',

    respuesta: '',

    adivinanzas: [

      {

        adi: 'En la cocina hago llorar, pero en el plato adorno el manjar', 
        res: 'LA CEBOLLA', 
        most: true, 
        cor: true, 
        pist: {

          pist1: {

            pname: 'Es una raiz', pmos: true

          },

          pist2: {

            pname: 'Posee un tallo', pmos: true

          },

          pist3: {

            pname: 'Las mas conocidas son de color blanco y morado', pmos: true

          }

        }

      },

      {

        adi: 'No me puedo mover sin alguien a la par mia; puedo achicarme y crecer muchos metros en un dia', 
        res: 'LA SOMBRA', 
        most: true, 
        cor: true, 
        pist: {

          pist1: {

            pname: 'No es una persona, ni un animal, ni una planta, ni un objeto', pmos: true

          },

          pist2: {

            pname: 'Todo ser en el mundo posee una', pmos: true

          },

          pist3: {

            pname: 'Es mas visible cuando hay mucha luz', pmos: true

          }

        }

      },

      {

        adi: 'Cual es la cosa que cruda no existe ni puede ser, y cuando esta cosida no te la puedes comer?', 
        res: 'LA CAL', 
        most: true, 
        cor: true, 
        pist: {

          pist1: {

            pname: 'Su color usualmente es blanco', pmos: true

          },

          pist2: {

            pname: 'Normalmente se ve como un polvo, el cual se utiliza en la cocina', pmos: true

          },

          pist3: {

            pname: 'Se obtiene de la calcinacion de rocas calizas', pmos: true

          }

        }

      }

    ],
    numero: 0,
    puntuacion: 0,
    historial: null,
    historia: [
      
    ]

  },

  mounted: function(){
    if(localStorage.getItem('historia')) {
      try {
        this.historia = JSON.parse(localStorage.getItem('historia'));
      } catch(e) {
        localStorage.removeItem('historia');
      }
    }
    this.numeroRandom();

    if (this.adivinanzas[this.numero].most) {

      document.querySelector('#guess').innerHTML = this.adivinanzas[this.numero].adi;

      this.adivinanzas[this.numero].most = false;
        this.$nextTick(function () {
          this.$el.textContent

        })

    }

    this.puntuacion = this.adivinanzas.length * 5;
    this.$nextTick(function () {
     this.$el.textContent
   })    

  },

  methods:{
    addHistoria(){
      if(!this.historial) return;
      this.historia.push(this.historial  + ' ' + this.puntuacion);
      this.historial = '';
      this.saveHistoria();

      document.getElementById('maScore').className+='hidden';
      document.getElementById('historia').classList.remove('hidden');
      this.title = "Resultados"
    },

    saveHistoria(){
      let parsed = JSON.stringify(this.historia);
      localStorage.setItem('historia', parsed);
    },

    numeroRandom: function(){

         this.numero = Math.floor(Math.random() * this.adivinanzas.length);
         this.$nextTick(function () {
          this.$el.textContent
        })
        
    },

    removeHistoria(x) {
      this.historia.splice(x,1);
      this.saveHistoria();
    },

    verAdivinanza: function(){
     
      this.numeroRandom();

    if (this.adivinanzas[this.numero].most) {

      document.querySelector('#guess').innerHTML = this.adivinanzas[this.numero].adi;

      this.adivinanzas[this.numero].most = false;
        this.$nextTick(function () {
          this.$el.textContent

        })

    }else {
        if (this.win()) {
          this.verAdivinanza();
        }else{
          document.querySelector('#guess').innerHTML = 'Save your score';
          this.hide();
        }      

    }

    },
    
 hide: function(){
  
  document.getElementById('mAdivinanzas').className+='hidden';
  document.getElementById('maScore').classList.remove('hidden');
  this.title = "Ingrese su Nickname"

},

    verPistas: function(){
      var a = this.numero;

      if(this.adivinanzas[a].pist.pist1.pmos === true){
        document.querySelector('#answer').innerHTML = this.adivinanzas[a].pist.pist1.pname;
        
        this.adivinanzas[a].pist.pist1.pmos = false;
        this.$nextTick(function () {
          this.$el.textContent

        })
      }
      else if(this.adivinanzas[a].pist.pist1.pmos === false && this.adivinanzas[a].pist.pist2.pmos === true){
        document.querySelector('#answer').innerHTML = this.adivinanzas[a].pist.pist1.pname + " <br> " + this.adivinanzas[a].pist.pist2.pname;

        this.adivinanzas[a].pist.pist2.pmos = false;
        this.$nextTick(function () {
          this.$el.textContent

        })
      }
      else {
       
        
        if(this.adivinanzas[a].pist.pist1.pmos === false && this.adivinanzas[a].pist.pist2.pmos === false && this.adivinanzas[a].pist.pist3.pmos === false){
          document.querySelector('#answer').innerHTML = this.adivinanzas[a].pist.pist1.pname + "<br>" + this.adivinanzas[a].pist.pist2.pname + "<br>" + this.adivinanzas[a].pist.pist3.pname;
        } else{
          document.querySelector('#answer').innerHTML = this.adivinanzas[a].pist.pist1.pname + "<br>" + this.adivinanzas[a].pist.pist2.pname + "<br>" + this.adivinanzas[a].pist.pist3.pname;
          this.adivinanzas[a].pist.pist3.pmos = false;
          this.$nextTick(function () {
          this.$el.textContent
        })
        }
      }
    },

    correcta: function() {
      if(this.adivinanzas[this.numero].res === this.respuesta.toUpperCase()){
        if(this.adivinanzas[this.numero].pist.pist1.pmos === false && this.adivinanzas[this.numero].pist.pist2.pmos === false && this.adivinanzas[this.numero].pist.pist3.pmos === false){
          this.puntuacion = this.puntuacion - 3;
            this.$nextTick(function () {
            this.$el.textContent
          })
        } else if(this.adivinanzas[this.numero].pist.pist1.pmos === false && this.adivinanzas[this.numero].pist.pist2.pmos === false && this.adivinanzas[this.numero].pist.pist3.pmos === true){
          this.puntuacion = this.puntuacion - 2;
            this.$nextTick(function () {
            this.$el.textContent
          })
        }else if(this.adivinanzas[this.numero].pist.pist1.pmos === false && this.adivinanzas[this.numero].pist.pist2.pmos === true && this.adivinanzas[this.numero].pist.pist3.pmos === true){
          this.puntuacion = this.puntuacion - 1;
            this.$nextTick(function () {
            this.$el.textContent
          })
        }else if(this.adivinanzas[this.numero].pist.pist1.pmos === true && this.adivinanzas[this.numero].pist.pist2.pmos === true && this.adivinanzas[this.numero].pist.pist3.pmos === true){
            this.$nextTick(function () {
            this.$el.textContent
          })
        }
        alert('correcto'); 
        document.querySelector('#guess').innerHTML = '';
        this.respuesta = '';
        this.verAdivinanza();
      }else{
        if(this.adivinanzas[this.numero].pist.pist1.pmos === false && this.adivinanzas[this.numero].pist.pist2.pmos === false && this.adivinanzas[this.numero].pist.pist3.pmos === false){
        this.puntuacion = this.puntuacion - 5;
          this.$nextTick(function () {
          this.$el.textContent
        })
      } else if(this.adivinanzas[this.numero].pist.pist1.pmos === false && this.adivinanzas[this.numero].pist.pist2.pmos === false && this.adivinanzas[this.numero].pist.pist3.pmos === true){
        this.puntuacion = this.puntuacion - 5;
          this.$nextTick(function () {
          this.$el.textContent
        })
      }else if(this.adivinanzas[this.numero].pist.pist1.pmos === false && this.adivinanzas[this.numero].pist.pist2.pmos === true && this.adivinanzas[this.numero].pist.pist3.pmos === true){
        this.puntuacion = this.puntuacion - 5;
          this.$nextTick(function () {
          this.$el.textContent
        })
      }else if(this.adivinanzas[this.numero].pist.pist1.pmos === true && this.adivinanzas[this.numero].pist.pist2.pmos === true && this.adivinanzas[this.numero].pist.pist3.pmos === true){
        this.puntuacion = this.puntuacion - 5;
          this.$nextTick(function () {
          this.$el.textContent
        })
      }
        this.adivinanzas[this.numero].cor = false;
        this.$nextTick(function () {
          this.$el.textContent
        })
        alert('La respuesta correcta era: ' + this.adivinanzas[this.numero].res);
        document.querySelector('#guess').innerHTML = '';
        this.respuesta = '';
        this.verAdivinanza();
      }
      
       
    },

    win: function(){
      var count = 0;
    for (var adivinanza in app.adivinanzas){
      if(adivinanza, app.adivinanzas[adivinanza].most == false){	
    count ++;  
      }	
    }
    if(count >= app.adivinanzas.length){
        return false;
      }else{
        return true;
      }
    }
  }

})

function show(){
  document.getElementById('answer').classList.remove('hidden');
}

function hide(){
  if (document.getElementById('answer').classList.contains('hidden')) {
    
  }else{
    document.getElementById('answer').className+='hidden';
  }
}