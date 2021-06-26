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
  
  @Input() user: User;

  title: "hello";
    
    
  constructor(public data:CanvasDataService) { }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas', {
      isDrawingMode:true
    });
    
    this.canvas.on('object:added', this.updateCanvasData(this.user, "hello"));
    this.canvas.on('object:removed', this.updateCanvasData(this.user, "hello"));
    this.canvas.on('object:modified', this.updateCanvasData(this.user, "hello"));
    console.log(this.user.displayName);
    
  }
  updateCanvasData(user, canvasData){
    this.data.updateCanvasData(user, canvasData);
  };

}
