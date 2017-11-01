Matter.use(
    'matter-wrap'
);

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// add mouse control
var mouse = Matter.Mouse.create(render.canvas),
	mouseConstraint = Matter.MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.2,
			render: {
				visible: false
			}
		}
	});

World.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// wrapping using matter-wrap plugin
var allBodies = Composite.allBodies(world);

for (var i = 0; i < allBodies.length; i += 1) {
	allBodies[i].plugin.wrap = {
		min: { x: render.bounds.min.x - 100, y: render.bounds.min.y },
		max: { x: render.bounds.max.x + 100, y: render.bounds.max.y }
	};
}

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);