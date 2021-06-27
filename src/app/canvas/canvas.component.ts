import { Component, Input, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { User } from '../shared/User';
import { CanvasDataService } from '../shared/canvas-data.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  canvas: any;
  canvasdata: string;
  color = "#000000";
  drawingMode = "draw";
  @Input() user;
  
    
    
  constructor(public data:CanvasDataService) { }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas', {
      isDrawingMode:true
    });
    this.data.getCanvasState(this.user).subscribe(val => {
      this.canvas.loadFromJSON(val.data().canvasdata)
    });
    const canvasSaveState = () => {
      this.data.updateCanvasData(this.user, JSON.stringify(this.canvas));
    };
    
    this.canvas.on('object:added', canvasSaveState);
    this.canvas.on('object:removed', canvasSaveState);
    this.canvas.on('object:modified', canvasSaveState);
    
  }
  changebrush(color){
    this.canvas.freeDrawingBrush.color = color;
    console.log("hello")
  }
  clearCanvas(){
    this.canvas.clear();
  }

  

  

}
