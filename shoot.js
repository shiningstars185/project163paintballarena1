AFRAME.registerComponent("bullets",{
    init: function(){
        this.shootBullet();
    },
    shootShooter: function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z"){
                var bullet = document.createElement("a- entity");
                 bullet.setAttribute("geometry",{
                    primitive:"sphere",
                    radius: 0.1,
                 });

                 bullet.setAttibute("material","color","black");
                 var cam = document.querySelector("#camera");
                 pos = cam.getAttribute("position");

                bullet.setAttribute("position",{
                    x:pos.x,
                    y:pos.y,
                    z:pos.z,
                  });

    var camera = document.querySelector("#camera").object3D;
    
    //get cam direction as Three.js vector
    var direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    //set the vel and direction
    bullet.setAttribute("velocity", direction.multipleScalar(-10));

    var scene = document.querySelector("#scene")

    //set the shooter as the dynamic entity
    bullet.setAttribute("dynamic-body",{
        shape:"sphere",
        mass:"0",
    });

    //add the collide event listener to the shooter
    bullet.addEventListener("collide", this.removeBullet);
    scene.appendChild(bullet);

    //shooting sound
    this.shootSound();

                 
            }
        })
    },

    removeBullet: function(e){
        //bullet element
        var element = e.detail.target.el;

        //element which is hit
        var elementHit = e.detail.body.el;
         if(elementHit.id.includes("box")){
            element.setAttribute("material",{
                opacity:1,
                transparent:true,
            });

        //impulse and point vector
        var impulse = new CANNON.Vec3(-2,2,1);
        var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
        );

        elementHit.body.applyImpulse(impulse, worldPoint);

        //remove event listener
        element.removeEventListener("collide", this.removeBullet);

        //remove the b7ullets from the scene
        var scene = document.querySelector("#scene");
        scene.removeChild(element);
         }
    },
    shootSound: function(){
        var entity = document.querySelector("#sound1");
        entity.components.sound.playSound();
    },
});