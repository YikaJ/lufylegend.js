function Baihu(controllerClass){
	var self = this;
	base(self,LSprite,[]);
	self.controllerClass = controllerClass;
	self.index = 1;
	self.length = 32;
	self.init();
}
Baihu.COMPLETE = "complete";
Baihu.prototype.init=function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(LMvc.datalist["baihu-1"]));
	self.addChild(self.bitmap);
};
Baihu.prototype.run=function(){
	var self = this;
	self.addEventListener(LEvent.ENTER_FRAME, self.onframe);
};
Baihu.prototype.onframe=function(event){
	var self = event.target;
	self.bitmap.bitmapData = new LBitmapData(LMvc.datalist["baihu-"+self.index]);
	self.index++;
	if(self.index > self.length){
		self.removeEventListener(LEvent.ENTER_FRAME, self.onframe);
		self.dispatchEvent(Baihu.COMPLETE);
		/*
		//self.dispatchEvent(Qinglong.COMPLETE);
		self.removeChild(self.bitmap);
		self.bitmap = null;
		self.index = 0;
		self.length = 3;
		self.effectList = [{x:50,y:50},{x:200,y:100},{x:100,y:150}];
		var list = LGlobal.divideCoordinate(80,630,7,1);
		self.list = [
		[list[0][0],list[1][0],list[2][0],list[3][0],list[4][0],list[5][0],list[6][0]]
		];
		self.effect = new LAnimation(self,new LBitmapData(LMvc.datalist["effect01"],0,0,80,90),self.list);
		self.effect.addEventListener(LEvent.COMPLETE,self.onEffectComplete);
		self.speed = 2;
		self.speedIndex = 0;
		
		var obj = self.effectList[self.index];
		self.effect.x = obj.x;
		self.effect.y = obj.y;
		self.index++;
	
		self.addEventListener(LEvent.ENTER_FRAME, self.attackFrame);*/
	}
};
Baihu.prototype.attackFrame=function(event){
	var self = event.target;
	if(self.speedIndex++ <self.speed)return;
	self.speedIndex = 0;
	self.effect.onframe();
};
Baihu.prototype.onEffectComplete=function(event){
	var self = event.target.parent;
	var obj = self.effectList[self.index];
	self.index++;
	if(self.index > self.length){
		self.removeEventListener(LEvent.ENTER_FRAME, self.attackFrame);
		self.dispatchEvent(Baihu.COMPLETE);
		return;
	}
	self.effect.x = obj.x;
	self.effect.y = obj.y;
};
