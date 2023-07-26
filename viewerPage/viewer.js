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


    const lineMaterial = new LineBasicMaterial({ color: 'black' });
	  const baseMaterial = new MeshBasicMaterial({
		polygonOffset: true,
		polygonOffsetFactor: 1, // positive value pushes polygon further away
		polygonOffsetUnits: 1,
	});
	  await viewer.edges.create('example', model.modelID, lineMaterial, baseMaterial);

    //viewer.dimensions.active = true;
    //viewer.dimensions.previewActive = true;

    //window.ondblclick = () => {
    //  viewer.dimensions.create();
    //}

    //window.onkeydown = (event) => {
    //  if(event.code == 'Delete') {
    //    viewer.dimensions.delete();
    //  }
    //}

  }

loadIfc('./Eames_PlasticArmchair_DAX.ifc'); 
