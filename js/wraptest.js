var Example = Example || {};

Matter.use(
    'matter-wrap'
);

birthday = function() {
	document.getElementById("helpBtn").style.visibility = "visible";
	
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: $(window).width(),
            height: $(window).height(),
			background: '#0f0f13',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    World.add(world, [
        Bodies.rectangle($(window).width() / 2, $(window).height() / 2, 800, 100, {
                render: {
					strokeStyle: '#ffffff',
                    sprite: {
                        texture: 'birthdayText.png'
                    }
                }, 
				isStatic: true
				}
            )
    ]);
	
	for (var i = 0; i < 10; i += 1) {
		World.add(world, [
			Bodies.circle($(window).width() / 2 + i, $(window).height() / 4, 100, {
				render: {
					strokeStyle: '#ffffff',
					sprite: {
						texture: 'cake.png'
					}
			}}
			)
		]);
	}
	
	for (var i = 0; i < 10; i += 1) {
		World.add(world, [
			Bodies.circle($(window).width() / 2 + i, $(window).height() / 4 * 3, 100, {
				render: {
					strokeStyle: '#ffffff',
					sprite: {
						texture: 'cake.png'
					}
			}}
			)
		]);
	}

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: $(window).width(), y: $(window).height() }
    });

    // wrapping using matter-wrap plugin
    var allBodies = Composite.allBodies(world);

    for (var i = 0; i < allBodies.length; i += 1) {
        allBodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x - 100, y: render.bounds.min.y },
            max: { x: render.bounds.max.x + 100, y: render.bounds.max.y }
        };
    }

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};