   /*-------ENGINE VIEWPORT--------*/
var Engine = Matter.Engine,
    Render = Matter.Render,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Body = Matter.Body,
    Events = Matter.Events,
    Sleep = Matter.Sleeping,
    World = Matter.World,
    Runner = Matter.Runner,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies,
    //Svg = Matter.Svg,
    Vertices = Matter.Vertices;

/*-----------VARIABLES-----------*/
var total_moleculas = 20;
var moleculas_unidas;
var array_moleculas_unidas = [];
var moleculas_unidas_1;
var array_moleculas_unidas_1 = [];
var atomo_rojo;
var atomo_blanco;
var radio_atomo_rojo = 15;
var radio_atomo_blanco = 5;
var radio_molecula = (radio_atomo_rojo * 2) + (radio_atomo_blanco * 2);
var velocity = 0;
var velocity_1 = 0;
var valor_value;

var num_moleculas_separadas;
var num_moleculas_unidas;

var vaso_moleculas;
var vaso_agua;


var pega_Default = 0x0001;
var no_pega = 0x0002;



/*----------------VARIABLES 2---------------*/
var co;
var pka;
var ka;
var x;
var ph;
var porcentaje_disolucion;
var h;
var ha;
/*TIME*/
var counter=0;
var barra_superior_vaso_agua;

/**/
var barra_superior;
var barra_inferior;
var barra_derecha;
var barra_izquierda;

/**/
var barra_izquierda_vaso_moleculas;
var barra_derecha_vaso_moleculas;
var barra_inferior_vaso_moleculas;

/**/
var barra_izquierda_vaso_agua;
var barra_derecha_vaso_agua;
var barra_inferior_vaso_agua;

/**/
var cont;
var valor_cambiado = "";
var sub = "";

/**/
var imagen_vaso_moleculas;
var imagen_vaso_agua;


$( document ).ready(function() {


/*----ENGINE VIEWPORT-----*/
engine = Engine.create();
world = engine.world;
world.gravity.x = 0;
world.gravity.y = 0.2;

/*---------CANVAS VIEWPORT------------*/
runner = Runner.create();
  element = $("#viewport")[0];
  width = 1000;
  height = 800;

render = Render.create({
  element: element,
  engine: engine,
  options: {
    width: width,
    height: height,
    wireframes: false,
    background: 'black'
  }
});




/*----------BARRAS DE COLISION VIEWPORT--------------*/
barra_superior = Bodies.rectangle(width/2,0,width,radio_atomo_blanco,{isStatic:true});
barra_inferior = Bodies.rectangle(width/2,height,width,radio_atomo_blanco,{isStatic:true});
barra_derecha = Bodies.rectangle(width,height/2,radio_atomo_blanco,height,{isStatic:true});
barra_izquierda = Bodies.rectangle(0,height/2,radio_atomo_blanco,height,{isStatic:true});
World.add(world,[barra_superior,barra_inferior,barra_derecha,barra_izquierda]);

/*-------------------------VASO_MOLECULAS-------------------------*/
/*
barra_izquierda_vaso_moleculas = Bodies.rectangle(200,200,10,200,{isStatic: true});
barra_derecha_vaso_moleculas = Bodies.rectangle(500,200,10,200,{isStatic: true});
barra_inferior_vaso_moleculas = Bodies.rectangle(350,300,300,10,{isStatic: true});

vaso_moleculas = Body.create({
    parts: [barra_izquierda_vaso_moleculas,barra_derecha_vaso_moleculas,barra_inferior_vaso_moleculas],
    restitution: 0,
    friction: 0,
    frictionStatic : 0,
    frictionAir: 0,
    inertia: Infinity,
    mass: 1,
    isStatic: true,
    //angle: 2
    });
*/

//World.add(world,vaso_moleculas);
/*
for (let i = 0; i < svgs.length; i += 1) {
        (function(i) {
            $.get('js/img/' + svgs[i] + '.svg').done(function(data) {
                var vertexSets = [];
                //,color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

                $(data).find('path').each(function(i, path) {
                    var points = Svg.pathToVertices(path, 30);
                    vertexSets.push(Vertices.scale(points, 0.4, 0.4));
                });

                World.add(world, Bodies.fromVertices(100 + i * 150, 200 + i * 50, vertexSets, {
                    render: {
                        fillStyle: color,
                        strokeStyle: color,
                        lineWidth: 1
                    }
                }, 
                true));
            });
        })(i);
    }
    */
/*
 $.get('./svg/svg.svg').done(function(data) {
        var vertexSets = [],
            color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

        $(data).find('path').each(function(i, path) {
            vertexSets.push(Svg.pathToVertices(path, 30));
        });

        World.add(world, Bodies.fromVertices(400, 80, vertexSets, {
            render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 1
            }
        }, true));
    });
*/
/*-------------------------VASO_AGUA-------------------------*/
/*
barra_izquierda_vaso_agua = Bodies.rectangle(200,600,10,200,{isStatic: true});
barra_derecha_vaso_agua = Bodies.rectangle(600,600,10,200,{isStatic: true});
barra_inferior_vaso_agua = Bodies.rectangle(400,700,400,10,{isStatic: true});

vaso_agua = Body.create({
    parts: [barra_izquierda_vaso_agua,barra_derecha_vaso_agua,barra_inferior_vaso_agua],
    restitution: 0,
    friction: 0,
    frictionStatic : 0,
    frictionAir: 0,
    inertia: Infinity,
    mass: 1,
    isStatic: true,
    });
  */

//World.add(world,vaso_agua);
//,sprite:{texture:'img/ball.png'}
vasos();
//var vasito = 

/*--------BOLAS VIEWPORT------------*/
function bolas_viewport(){
 for(let i = 0; i < total_moleculas; i++){
    atomo_rojo = Bodies.circle(280,150, radio_atomo_rojo,{render:{fillStyle:'red',strokeStyle:'red',sprite:{texture:'js/img2/Esfera_Grande.png'}},id:"circulo_rojo_"+[i]});
    atomo_blanco = Bodies.circle(((atomo_rojo.position.x) + 5),((atomo_rojo.position.y) + 15),radio_atomo_blanco,{render:{fillStyle:'white',strokeStyle:'black',sprite:{texture:'js/img2/Esfera_2.png'}},id:"circulo_blanco_"+[i]});
    
    moleculas_unidas = Body.create({
    parts: [atomo_rojo,atomo_blanco],
    restitution: 1,
    friction: 0,
    frictionStatic : 0,
    frictionAir: 0,
    inertia: Infinity,
    mass: 1,
    id: "molecula_unida_"+[i],
    });

    Body.setVelocity( moleculas_unidas, {x: velocity, y: -velocity});
    moleculas_unidas.restitution = 0;
    moleculas_unidas.friction = 0;
    moleculas_unidas.frictionStatic = 0;
    moleculas_unidas.frictionAir = 0;
    moleculas_unidas.inertia = Infinity;
    moleculas_unidas.mass = 1;
    moleculas_unidas.collisionFilter.mask = pega_Default;
    cambiar_color(valor_value);

    array_moleculas_unidas.push(moleculas_unidas);


  }
  World.add(world, array_moleculas_unidas);
  Runner.run(runner, engine);
  Render.run(render);
  }

  bolas_viewport();
 console.log(array_moleculas_unidas);
$("#slider").slider({
    min: 0,
    max: 5,
    value: 0,
  });

      function limpiar(){
        render.canvas.parentNode.removeChild(render.canvas);
        render.textures = {};
        Runner.stop(runner);
        World.clear(engine.world);
        Engine.clear(engine);

      }

      function crea(){
        render = Render.create({
          element: element,
          engine: engine,
          options: {
            width: width,
            height: height,
            wireframes: false,
            background: 'black'
          }
        });
      }

      function vasos(){
      	/*
        barra_izquierda_vaso_moleculas = Bodies.rectangle(200,200,10,200,{isStatic: true});
        barra_derecha_vaso_moleculas = Bodies.rectangle(500,200,10,200,{isStatic: true});
        barra_inferior_vaso_moleculas = Bodies.rectangle(350,300,300,10,{isStatic: true});
        , render:{strokeStyle: 'transparent',fillStyle: 'transparent'}
		*/

		barra_izquierda_vaso_moleculas = Bodies.rectangle(198,193,10,170,{isStatic: true, render:{strokeStyle: 'transparent',fillStyle: 'transparent'}});
        barra_derecha_vaso_moleculas = Bodies.rectangle(382,193,10,170,{isStatic: true, render:{strokeStyle: 'transparent',fillStyle: 'transparent'}});
        barra_inferior_vaso_moleculas = Bodies.rectangle(290,284,195,10,{isStatic: true, render:{strokeStyle: 'transparent',fillStyle: 'transparent'}});

        vaso_moleculas = Body.create({
            parts: [barra_izquierda_vaso_moleculas,barra_derecha_vaso_moleculas,barra_inferior_vaso_moleculas],
            restitution: 1,
            friction: .00002,
            //frictionStatic : 0,
            //frictionAir: 0,
            inertia: Infinity,
            //mass: 30,
            isStatic: true
            //angle: 2
            });
        vaso_moleculas.collisionFilter.category = pega_Default;
        
        World.add(world,vaso_moleculas);
        console.log("vasos",vaso_moleculas);
/*
        barra_izquierda_vaso_agua = Bodies.rectangle(200,600,10,200,{isStatic: true});
        barra_derecha_vaso_agua = Bodies.rectangle(600,600,10,200,{isStatic: true});
        barra_inferior_vaso_agua = Bodies.rectangle(400,700,400,10,{isStatic: true});
*/
        barra_izquierda_vaso_agua = Bodies.rectangle(200,592,10,170,{isStatic: true, render:{strokeStyle: 'transparent',fillStyle: 'transparent'}});
        barra_derecha_vaso_agua = Bodies.rectangle(670,592,10,170,{isStatic: true, render:{strokeStyle: 'transparent',fillStyle: 'transparent'}});
        barra_inferior_vaso_agua = Bodies.rectangle(435,682,460,10,{isStatic: true, render:{strokeStyle: 'transparent',fillStyle: 'transparent'}});

        vaso_agua = Body.create({
            parts: [barra_izquierda_vaso_agua,barra_derecha_vaso_agua,barra_inferior_vaso_agua],
            restitution: 0,
            friction: 0,
            frictionStatic : 0,
            frictionAir: 0,
            inertia: Infinity,
            mass: 1,
            isStatic: true,
            category: pega_Default,
            });
        vaso_agua.collisionFilter.category = pega_Default;
        //vaso_agua.collisionFilter.mask = no_pega;
        World.add(world,vaso_agua);

        barra_superior_vaso_agua = Bodies.rectangle(435,515,430,10,{isStatic: true,isSensor: true, render:{strokeStyle: 'transparent',fillStyle: 'transparent'}});
        World.add(world,barra_superior_vaso_agua);

        
        imagen_vaso_moleculas = Bodies.rectangle(290,200,0.1,0.2,{isStatic: true, render:{sprite:{texture:'js/img2/Contenedor_1.png'},}});
        World.add(world,imagen_vaso_moleculas);
        console.log("imagen",imagen_vaso_moleculas);

		

        imagen_vaso_agua = Bodies.rectangle(435,600,10,20,{isStatic: true, render:{sprite:{texture:'js/img2/Contenedor_2.png'}}});
        World.add(world,imagen_vaso_agua);


        //CON LO UNICO QUE REALIZARA UNA COLICION SERA CON vaso_agua
        //  World.add(world,barra_superior_vaso_agua.collisionFilter.mask = vaso_agua);
      }
      
      
      function cambiar_color(valor_value){
        switch(valor_value){
          case 0:
            atomo_rojo.render.fillStyle = "red";
            atomo_rojo.render.strokeStyle = "red";
            $("#texto").text("pKa= 0");
          break;

          case 1:
            atomo_rojo.render.fillStyle = "brown";
            atomo_rojo.render.strokeStyle = "brown";
            $("#texto").text("pKa= 1");
          break;

          case 2:
            atomo_rojo.render.fillStyle = "green";
            atomo_rojo.render.strokeStyle = "green";
            $("#texto").text("pKa= 2");
          break;

          case 3:
            atomo_rojo.render.fillStyle = "yellow";
            atomo_rojo.render.strokeStyle = "yellow";
            $("#texto").text("pKa= 3");
          break;

          case 4:
            atomo_rojo.render.fillStyle = "pink";
            atomo_rojo.render.strokeStyle = "pink";
            $("#texto").text("pKa= 5");
          break;

          case 5:
            atomo_rojo.render.fillStyle = "purple";
            atomo_rojo.render.strokeStyle = "purple";
            $("#texto").text("pKa= 7");
          break;
        }
      }
/*--------------------MENU DE CO--------------------*/
      function valor_co(){
        co = $("#monoxido_carbono").val();
        limpiar();
        crea();
        vasos();
        array_moleculas_unidas = [];
        array_moleculas_unidas_1 = [];
        valor_value = $( "#slider" ).slider( "value" );

        formulas();
        bolas_viewport();
        movimiento_vaso();
        //bolas_viweport_1();
      }
    $("#monoxido_carbono").on("change",valor_co);

    function formulas(){
      pka = valor_value;
      switch(pka){
        case 4:
          pka = 5;
        break;

        case 5:
          pka = 7;
        break;
      }

      ka = Math.pow(10,-pka);
      $("#ka").text("Ka= "+ka);

      x = (((-ka) + Math.sqrt(Math.pow(ka,2)+(4*ka*co)))/2);
      $("#x").text("x= "+x);

      ph = -(Math.log(x) / Math.log(10));
      $("#ph").text("pH= "+ph.toFixed(2));

      porcentaje_disolucion = (x/co) * 100;
      $("#porcentaje_disolucion").text("% Disolución= "+porcentaje_disolucion.toFixed(2));

      h = x;
      $("#h").text("H= "+h.toExponential(3));

      ha = co - x;
      $("#ha").text("Ha= "+ha.toExponential(3));

      num_moleculas_separadas = Math.round((porcentaje_disolucion * total_moleculas)/100);
      num_moleculas_unidas = total_moleculas - num_moleculas_separadas;
      }
/*
    function bolas_viweport_1(){
    
        for (let i = 0; i < num_moleculas_separadas; i++) {
          atomo_rojo = Bodies_1.circle((radio_atomo_rojo + (Math.random() * (width_1 - 2 * radio_atomo_rojo))),(radio_atomo_rojo + (Math.random() * (height_1 - 2 * radio_atomo_rojo))), radio_atomo_rojo,{render:{fillStyle:'red',strokeStyle:'red'}});
          atomo_blanco = Bodies_1.circle((radio_atomo_blanco + (Math.random() * (width_1 - 2 * radio_atomo_blanco))),(radio_atomo_blanco + (Math.random() * (height_1 - 2 * radio_atomo_blanco))),radio_atomo_blanco,{render:{fillStyle:'white',strokeStyle:'black'}});
          
          
          atomo_rojo.restitution = 1;
          atomo_rojo.friction = 0;
          atomo_rojo.frictionStatic = 0;
          atomo_rojo.frictionAir = 0;
          atomo_rojo.inertia = Infinity;
          atomo_rojo.mass = 1;
          cambiar_color(valor_value);
          atomo_rojo.render.opacity = "0.6";
          Body_1.setVelocity(atomo_rojo, {x: velocity_1, y: -velocity_1});


          atomo_blanco.restitution = 1;
          atomo_blanco.friction = 0;
          atomo_blanco.frictionStatic = 0;
          atomo_blanco.frictionAir = 0;
          atomo_blanco.inertia = Infinity;
          atomo_blanco.mass = 1;
          atomo_blanco.render.opacity = "0.7";
          Body_1.setVelocity(atomo_blanco, {x: velocity_1, y: -velocity_1});
          
          World_1.add(world_1, [atomo_rojo,atomo_blanco]);
        }

        
        for(let i = 0; i < num_moleculas_unidas; i++){
          atomo_rojo = Bodies_1.circle((radio_molecula + (Math.random() * (width_1 - 2 * radio_molecula))),(radio_molecula + (Math.random() * (height_1 - 2 * radio_molecula))), radio_atomo_rojo,{render:{fillStyle:'red',strokeStyle:'red'}});
          atomo_blanco = Bodies_1.circle(((atomo_rojo.position.x) + 15),((atomo_rojo.position.y) + 25),radio_atomo_blanco,{render:{fillStyle:'white',strokeStyle:'black'}});

          moleculas_unidas_1 = Body_1.create({
          parts: [atomo_rojo,atomo_blanco],
          restitution: 1,
          friction: 0,
          frictionStatic : 0,
          frictionAir: 0,
          inertia: Infinity,
          mass: 1,
          });


          Body_1.setVelocity( moleculas_unidas_1, {x: velocity_1, y: -velocity_1});
          moleculas_unidas_1.restitution = 1;
          moleculas_unidas_1.friction = 0;
          moleculas_unidas_1.frictionStatic = 0;
          moleculas_unidas_1.frictionAir = 0;
          moleculas_unidas_1.inertia = Infinity;
          moleculas_unidas_1.mass = 1;
          cambiar_color(valor_value);
          
          
          array_moleculas_unidas_1.push(moleculas_unidas_1);
        }
        World_1.add(world_1, array_moleculas_unidas_1);
      
      Runner_1.run(runner_1, engine_1);
      Render_1.run(render_1);
      }
      */
      //movimiento_vaso();
      //sensor();
/*------------------------SLIDER------------------------*/
  $( "#slider" ).on( "slidestop", function( event, ui ) {
      valor_value = ui.value;
      if(valor_value != valor_cambiado){
        limpiar();
        crea();
        Matter.World.remove(world, vaso_moleculas);
        //createjs.Tween.get(vaso_moleculas.constraintImpulse).to({angle:-0.06},50);
        //regresa_vaso();
        vasos();
        array_moleculas_unidas = [];
        array_moleculas_unidas_1 = [];
        movimiento_vaso();
        co = $("#monoxido_carbono").val();
        formulas();
        bolas_viewport();
        sensor();
        
        //eliminar_moleculas();

      }
      valor_cambiado = valor_value;
      
      
    });
  //Matter.Body.rotate(vaso_moleculas,2);
  
  

  function movimiento_vaso(){
    var v = {r:0, l:0};
    var delta;
    var grados_total = 115;
    createjs.Tween.removeAllTweens();
    createjs.Tween.get(v).wait(2000).to({r:1},3000).addEventListener("change", handleChange);

    function handleChange() {
        delta = v.r - v.l;
        v.l = v.r;

        Matter.Body.rotate(vaso_moleculas,((grados_total*delta) * (Math.PI/180)));
        Matter.Body.rotate(imagen_vaso_moleculas,((grados_total*delta) * (Math.PI/180)));
        /*LO DEL VASO GIRE CON SU IMAGEN*/
        vaso_moleculas.position.x = 290;
		vaso_moleculas.position.y = 200;
	    vaso_moleculas.positionPrev.x = 290;
	    vaso_moleculas.positionPrev.y = 200;
	    /**/
        Matter.Engine.update(engine);
    }
  }

  //console.log(array_moleculas_unidas["1"].id.length);
  var max = "";

function sensor(){
    var a = 0;
    var b = 0;
    var lectura = "";
    var contador = 0;
    
    //var nopega = 0x0003;
    console.log(num_moleculas_separadas);
    console.log(num_moleculas_unidas);
    var tapa = Bodies.rectangle(435,515,430,10,{isStatic: true, render:{strokeStyle: 'green',fillStyle: 'green'}});
    			tapa.collisionFilter.category = no_pega;
              	//tapa.collisionFilter.mask = no_pega;
        				World.add(world,tapa);
    //console.log(array_moleculas_unidas[1]);
    //console.log(array_moleculas_unidas[0].parts[2]);
    Events.on(engine, 'collisionEnd', function(event) {
        var pairs = event.pairs;
        //console.log("colicionando");
        
        for (let i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];
            //console.log(array_moleculas_unidas[j].bodyA.id);

            if (pair.bodyA === barra_superior_vaso_agua){
              a=a+1;
              //console.log(pair.bodyA);
              console.log(a);
              //pair.bodyB.collisionFilter.category = pega;
              for (let h = 0; h < array_moleculas_unidas.length; h++) {
	              if (array_moleculas_unidas[h].parts[1] === pair.bodyB){
	              		array_moleculas_unidas[h].collisionFilter.mask = pega_Default | no_pega;
	              		//Body.setVelocity(array_moleculas_unidas[h],{x: 10, y: 10});
	              }
              }
              //console.log("khe"+pair.bodyA.collisionFilter.mask);
              //Body.setVelocity( pair.bodyA, {x: 10, y: 10});
              //pair.bodyA = 
              //pair.bodyB.render.strokeStyle = "green";
              if(a == 40){
        		world.gravity.x = 0;
				world.gravity.y = 0;
				for (let h = 0; h < array_moleculas_unidas.length; h++) {
					array_moleculas_unidas[h].restitution = 1;
		            array_moleculas_unidas[h].friction =.00002;
				    array_moleculas_unidas[h].frictionStatic = 0;
				    array_moleculas_unidas[h].frictionAir = 0;
		            array_moleculas_unidas[h].inertia = Infinity;
		            array_moleculas_unidas[h].mass = 30;
	              Body.setVelocity(array_moleculas_unidas[h],{x: -5, y: 5});
              	}
              }
              /*

              sub = pair.bodyB.id;
              max = sub.substring(pair.bodyB.id.length,pair.bodyB.id.length-2);
              console.log(pair.bodyB.id);
              console.log(sub);
              console.log(max);
              */
              //array_moleculas_unidas[i].parts[2].position.x=15;
              //array_moleculas_unidas[i].parts[2].position.y=15;
              //console.log("body b",pair.bodyB);
              //console.log("array",array_moleculas_unidas[i].parts[0]);
              //Matter.World.remove(world,pair.bodyB);

              
              for (let h = 0; h < array_moleculas_unidas.length; h++) {
              	
              	if (array_moleculas_unidas[h].parts[1] === pair.bodyB && contador < num_moleculas_separadas) {
              		//console.log("body b",pair.bodyA);
              		//console.log("array",array_moleculas_unidas[h].parts[0]);
              		
              		//num_moleculas_separadas;
              			
						Matter.World.remove(world,array_moleculas_unidas[h].parts[0]);
						contador++;
              		}
              	
              }
              
              /*
              do{
              	if(array_moleculas_unidas[h].parts[2] === pair.bodyB){
              		Matter.World.remove(world,array_moleculas_unidas[h].parts[0]);
              		l++;
              	}
              }
              while(l < num_moleculas_separadas);
              */
            }/* else if (pair.bodyB === barra_superior_vaso_agua) {
              a=a+1;
             
              for (let i = 0; i < array_moleculas_unidas.length; i++) {
              	if (array_moleculas_unidas[i].bodyB.id = pair.bodyB) {
              		console.log(array_moleculas_unidas[i].parts[0]);
              		Matter.World.remove(world,array_moleculas_unidas[i].parts[0]);
              		console.log(array_moleculas_unidas[i].parts[0]);
              	}
              }
              //console.log(pair.bodyA);
              //Matter.World.remove(world, pair.bodyA);
            } */       
        }
        
        /*
         b=a/2;
        console.log(b);*/
    });

    Events.on(engine, 'collisionEnd', function(event) {
        var pairs = event.pairs;
        
        for (let i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];

            if (pair.bodyA === barra_superior_vaso_agua) {
                Matter.World.remove(world, pair.bodyB);
            } else if (pair.bodyB === barra_superior_vaso_agua) {
                Matter.World.remove(world, pair.bodyA);
            }
        }
    });
    
  }
/*
  function eliminar_moleculas(){
    var m = {r:0, l:0};
    var delto;
    //var grados_total=115;
    createjs.Tween.get(m).wait(8000).to({r:1},8000).addEventListener("change", handleChang);

    function handleChang(){
        delto = m.r - m.l;
        m.l = m.r;

        Matter.World.remove(world, array_moleculas_unidas);
        Matter.Engine.update(engine);
    }
  } 
*/
});
