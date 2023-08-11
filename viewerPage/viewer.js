import Drawing from 'dxf-writer';
import { Color, LineBasicMaterial, MeshBasicMaterial } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });

// Create grid and axes
//viewer.grid.setGrid();
//viewer.axes.setAxes();

let allPlans;
let model;

async function loadIfc(url) {
		// Load the model
    model = await viewer.IFC.loadIfcUrl(url);

    // Setup camera controls
    const controls = viewer.context.ifcCamera.cameraControls;
    controls.setPosition(1, 2, 1, false);
    controls.setTarget(0, 0.4, 0, false);


		// Add dropped shadow and post-processing efect
    await viewer.shadowDropper.renderShadow(model.modelID);
    await viewer.plans.computeAllPlanViews(model.modelID);


    const lineMaterial = new LineBasicMaterial({ color: 'black' });
	  const baseMaterial = new MeshBasicMaterial({
		polygonOffset: true,
		polygonOffsetFactor: 1, // positive value pushes polygon further away
		polygonOffsetUnits: 1,
	});
	  await viewer.edges.create('example', model.modelID, lineMaterial, baseMaterial);

    // Floor plan viewing

allPlans = viewer.plans.getAll(model.modelID);

const buttonContainer = document.getElementById('button-container');

for (const plan of allPlans) {
  const currentPlan = viewer.plans.planLists[model.modelID][plan];
  console.log(currentPlan);

  const button = document.createElement('button');
  buttonContainer.appendChild(button);
  button.textContent = currentPlan.name;
  button.onclick = () => {
    viewer.plans.goTo(model.modelID, plan);
    viewer.edges.toggle('example', true);
    viewer.shadowDropper.deleteShadow(model.modelID);
    window.ondblclick = () => {
      viewer.dimensions.create();
      viewer.dimensions.createInPlane();
    }

  };
}

const button = document.createElement('button');
buttonContainer.appendChild(button);
button.textContent = 'Exit';
button.onclick = () => {
  viewer.plans.exitPlanView();
  viewer.edges.toggle('example', false);
  viewer.plans.computeAllPlanViews(model.modelID);
  viewer.shadowDropper.renderShadow(model.modelID);
  };
}

loadIfc('./FU.CH_MeetingChair_Unix_Five-star.ifc'); 

// Assuming you have selected the div element
const targetDiv = document.querySelector('div:not([class]):not([id])');

// Remove the background color
targetDiv.style.backgroundColor = 'transparent';

viewer.dimensions.active = true;
viewer.dimensions.previewActive = true;

window.ondblclick = () => {
  viewer.dimensions.create();
  viewer.dimensions.createInPlane();
}

window.oncontextmenu = () => {
  viewer.dimensions.cancelDrawing();
}

window.onkeydown = (event) => {
  if(event.key === 'Escape') {
    viewer.dimensions.cancelDrawing();
  }
}

window.onkeydown = (event) => {
  if(event.code === 'Delete') {
      viewer.dimensions.delete();
  }
}


