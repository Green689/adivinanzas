var app = new Vue({

  el: '#neko',

  data: {
    title: 'Adivinanzas',

    respuesta: '',

    adivinanzas: [

      {

        adi: 'En la cocina hago llorar, pero en el plato adorno el manjar', res: 'LA CEBOLLA', most: true, cor: true, pist: {

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

        adi: 'No me puedo mover sin alguien a la par mia; puedo achicarme y crecer muchos metros en un dia', res: 'LA SOMBRA', most: true, cor: true, pist: {

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

        adi: 'Cual es la cosa que cruda no existe ni puede ser, y cuando esta cosida no te la puedes comer?', res: 'LA CAL', most: true, cor: true, pist: {

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
    numero: 0

  },

  mounted: function(){
    this.numeroRandom();

    if (this.adivinanzas[this.numero].most) {

      document.querySelector('#guess').innerHTML = this.adivinanzas[this.numero].adi;

      this.adivinanzas[this.numero].most = false;
        this.$nextTick(function () {
          this.$el.textContent

        })

    }else {

      this.verAdivinanza;

    }      

  },

  methods:{

    numeroRandom: function(){

         this.numero = Math.floor(Math.random() * this.adivinanzas.length);
         this.$nextTick(function () {
          this.$el.textContent

        })
        
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

        this.verAdivinanza;

      }      

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
        document.querySelector('#answer').innerHTML = this.adivinanzas[a].pist.pist1.pname + "<br>" + this.adivinanzas[a].pist.pist2.pname + "<br>" + this.adivinanzas[a].pist.pist3.pname;
      }
    },

    correcta: function() {
      if(this.adivinanzas[this.numero].res === this.respuesta.toUpperCase()){
        alert('correcto');
        this.verAdivinanza();
        this.respuesta = ''
      }else{
        alert('incorrecto' + this.adivinanzas[this.numero].res);
        this.verAdivinanza();
        this.respuesta = ''
      }
      
       
    }

  }

})