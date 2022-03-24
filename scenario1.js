(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"scenario1_atlas_1", frames: [[0,807,1085,805],[0,0,1086,805]]},
		{name:"scenario1_atlas_2", frames: [[0,0,1111,784],[0,786,1068,814]]},
		{name:"scenario1_atlas_3", frames: [[0,0,1068,814],[0,816,1068,814]]},
		{name:"scenario1_atlas_4", frames: [[0,0,1049,787],[0,789,1049,787]]},
		{name:"scenario1_atlas_5", frames: [[0,772,1039,770],[0,0,1058,770]]},
		{name:"scenario1_atlas_6", frames: [[0,0,1029,773],[1580,0,405,379],[1380,594,195,125],[1380,411,189,181],[1031,662,272,252],[1580,381,283,439],[1031,0,547,409],[1031,411,347,249]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Asset1 = function() {
	this.initialize(ss["scenario1_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Asset2 = function() {
	this.initialize(ss["scenario1_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Asset3 = function() {
	this.initialize(ss["scenario1_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Asset4 = function() {
	this.initialize(ss["scenario1_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Asset5 = function() {
	this.initialize(ss["scenario1_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Asset6 = function() {
	this.initialize(ss["scenario1_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.flag = function() {
	this.initialize(ss["scenario1_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Friends = function() {
	this.initialize(ss["scenario1_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Garden = function() {
	this.initialize(ss["scenario1_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Graduation = function() {
	this.initialize(ss["scenario1_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.HospitalBed = function() {
	this.initialize(ss["scenario1_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.HospitalBed2 = function() {
	this.initialize(ss["scenario1_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.JaneAlone = function() {
	this.initialize(ss["scenario1_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.NurseAnxious = function() {
	this.initialize(ss["scenario1_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.NurseIntroduction = function() {
	this.initialize(ss["scenario1_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Patient = function() {
	this.initialize(ss["scenario1_atlas_6"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Rings = function() {
	this.initialize(ss["scenario1_atlas_6"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Speechbubble = function() {
	this.initialize(ss["scenario1_atlas_6"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Tween2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Patient();
	this.instance.setTransform(-141.5,-219.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-141.5,-219.5,283,439);


(lib.ThankYou = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Thank you", "bold 72px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 88;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(5,-97.25);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-172,-123);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-172,-123,347,249);


(lib.Text4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Palliative care was introduced as a concept in a module in college recently", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 624;
	this.text.parent = this;
	this.text.setTransform(8,-152.95);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-305.9,-154.9,627.9,218);


(lib.Text3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("She had her first clinical placement on a surgical ward a few months ago and this went well", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 804;
	this.text.parent = this;
	this.text.setTransform(108.45,-167.95);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-295.3,-169.9,807.5999999999999,176.6);


(lib.Text2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Jane is a first-year student nurse", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 614;
	this.text.parent = this;
	this.text.setTransform(8,-165.95);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-300.9,-167.9,617.9,131);


(lib.StartScenario = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("START\nSCENARIO", "bold 50px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 62;
	this.text.lineWidth = 456;
	this.text.parent = this;
	this.text.setTransform(27,-37.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EgjMANfIAA69MBGZAAAIAAa9g");
	this.shape.setTransform(31.675,33.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-202.9,-53.3,459.9,210.39999999999998);


(lib.StartButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("START", "bold 63px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 77;
	this.text.lineWidth = 230;
	this.text.parent = this;
	this.text.setTransform(19,-50.25);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EgjEAJJQiRAAhmhnQhnhmAAiRIAAnVQAAiRBnhnQBmhmCRAAMBGJAAAQCRAABmBmQBnBnAACRIAAHVQAACRhnBmQhmBniRAAg");
	this.shape.setTransform(14.5488,-8.45,0.7418,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-177.9,-66.9,384.9,117);


(lib.SpeechBubble = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("What will I say?", "bold 59px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 73;
	this.text.lineWidth = 291;
	this.text.parent = this;
	this.text.setTransform(3.5,-73.45);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-172,-127);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-172,-127,347,249);


(lib.Son = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Her son, Adam, living in Austrailia", "bold 25px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 342;
	this.text.parent = this;
	this.text.setTransform(6.05,7.9);

	this.instance = new lib.flag();
	this.instance.setTransform(-73,-129,0.38,0.38);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-166.9,-129,346,224.6);


(lib.S2Text1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Jane has never seen someone die before and is anxious about this", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 588;
	this.text.parent = this;
	this.text.setTransform(6,-127.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-289.9,-129.4,591.9,216.5);


(lib.PrologueText3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Jane notices this too", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 335;
	this.text.parent = this;
	this.text.setTransform(-123.5,-177.4);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-292.9,-179.4,338.9,119.5);


(lib.PrologueText2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("She is aware that her body is weaker.", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 461;
	this.text.parent = this;
	this.text.setTransform(-60.5,-177.4);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-292.9,-179.4,464.9,119.5);


(lib.PrologueText1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Karen has become less well and is unable to carry out her care needs independently. ", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 557;
	this.text.parent = this;
	this.text.setTransform(-12.5,-177.4);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-292.9,-179.4,560.9,169.5);


(lib.PatientText5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("What is important to Karen?", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 530;
	this.text.parent = this;
	this.text.setTransform(13,-158.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-253.9,-160.4,533.9,57.5);


(lib.PatientText4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Karen is understandably sad that the recent treatment has not been affective.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 740;
	this.text.parent = this;
	this.text.setTransform(-14,-155.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-385.9,-157.4,743.9,158.5);


(lib.PatientText2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("She has had surgery, chemotherapy, and radiotherapy as treatment over this time.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 715;
	this.text.parent = this;
	this.text.setTransform(24.5,-173.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-334.9,-175.4,718.9,137.5);


(lib.PatientText1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Karen is 60 years old. She has a medical diagnosis of Colonic Cancer for the past three years, with liver involvement.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 757;
	this.text.parent = this;
	this.text.setTransform(22.5,-210.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-357.9,-212.2,760.9,466.1);


(lib.PatienText3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Recent scans have showed that the disease has progressed and her situation in now palliative.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 745;
	this.text.parent = this;
	this.text.setTransform(1.5,-139.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-372.9,-141.4,748.9,177.5);


(lib.p7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("A7uJOIAAybMA3dAAAIAASbg");
	this.shape.setTransform(-2.5077,0.0345,0.69,0.69);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124.9,-40.6,244.9,81.4);


(lib.p6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("A7uJOIAAybMA3dAAAIAASbg");
	this.shape.setTransform(-2.5077,0.0345,0.69,0.69);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124.9,-40.6,244.9,81.4);


(lib.p5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("A7uJOIAAybMA3dAAAIAASbg");
	this.shape.setTransform(-2.5077,0.0345,0.69,0.69);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124.9,-40.6,244.9,81.4);


(lib.p4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("A7uJOIAAybMA3dAAAIAASbg");
	this.shape.setTransform(-2.5077,0.0345,0.69,0.69);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124.9,-40.6,244.9,81.4);


(lib.p3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("A7uJOIAAybMA3dAAAIAASbg");
	this.shape.setTransform(-2.5077,0.0345,0.69,0.69);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124.9,-40.6,244.9,81.4);


(lib.p2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("A7uJOIAAybMA3dAAAIAASbg");
	this.shape.setTransform(-2.5077,0.0345,0.69,0.69);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124.9,-40.6,244.9,81.4);


(lib.p1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AtbE7IAAp1Ia3AAIAAJ1g");
	this.shape.setTransform(-96.987,-2.4595,1.31,1.31);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-209.6,-43.7,225.29999999999998,82.5);


(lib.Nextcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.text = new cjs.Text("Next", "italic 44px 'Segoe UI'", "#999999");
	this.text.textAlign = "center";
	this.text.lineHeight = 61;
	this.text.lineWidth = 149;
	this.text.parent = this;
	this.text.setTransform(6.5,-32.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AzIHgIAAu/MAmQAAAIAAO/g");
	this.shape.setTransform(7,1.0585,1,0.77);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-115.4,-35.9,244.9,77);


(lib.Next = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.text = new cjs.Text("Next", "italic 44px 'Segoe UI'", "#999999");
	this.text.textAlign = "center";
	this.text.lineHeight = 61;
	this.text.lineWidth = 149;
	this.text.parent = this;
	this.text.setTransform(6.5,-32.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A4NHgIAAu/MAwbAAAIAAO/g");
	this.shape.setTransform(6.98,1.05,0.79,1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-115.4,-46.9,244.9,96);


(lib.Marriage = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Her husband Jim", "bold 25px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 330;
	this.text.parent = this;
	this.text.setTransform(2,43.25);

	this.instance = new lib.Rings();
	this.instance.setTransform(-104,-106,0.36,0.36);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-164.9,-106,333.9,268.8);


(lib.JaneIntro = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("This is Jane", "bold 47px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 58;
	this.text.lineWidth = 303;
	this.text.parent = this;
	this.text.setTransform(4.5,-30.95);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149,-32.9,307,62);


(lib.Gardening = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Gardening", "bold 25px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 205;
	this.text.parent = this;
	this.text.setTransform(-8.5,-32.15);

	this.instance = new lib.Garden();
	this.instance.setTransform(-73,-150,0.64,0.64);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-113,-150,209,200.4);


(lib.Friends_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Karen's friends", "bold 25px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 254;
	this.text.parent = this;
	this.text.setTransform(-3,36.1);

	this.instance = new lib.Friends();
	this.instance.setTransform(-104,-104);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-132,-104,258,229.1);


(lib.EpText3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Jane initially worried about what to say... she has realised that being present with Karen was so important... listening and acknowledging her concerns.... often there are no right things to say or answers to give.....", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 577;
	this.text.parent = this;
	this.text.setTransform(-117.5,-194.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-407.9,-196.6,580.9,355.6);


(lib.EpText2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("“Palliative care is an approach that improves the quality of life of patients and their families facing the problems associated with life threatening illness, through the prevention and relief of suffering by means of early intervention and impeccable assessment and treatment of pain and other problems, physical, psychological and spiritual” (WHO 2002).", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 636;
	this.text.parent = this;
	this.text.setTransform(-106,-194.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-425.9,-196.6,639.9,514.6);


(lib.EpText1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Jane reflects on her experience with Karen and has learned about the holistic nature of palliative care focussing on the \"Total Care\" of the person.", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 580;
	this.text.parent = this;
	this.text.setTransform(-9,-194.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-300.9,-196.6,583.9,174.7);


(lib.Daughter = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Her daughter, Kim,\nwho will be graduating soon", "bold 25px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 287;
	this.text.parent = this;
	this.text.setTransform(6.5,-53.9);

	this.instance = new lib.Graduation();
	this.instance.setTransform(-76,-197,0.56,0.56);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-139,-197,291,240.1);


(lib.BackB5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("BACK", "37px 'Arial'", "#FFFFFF");
	this.text.lineHeight = 43;
	this.text.lineWidth = 179;
	this.text.parent = this;
	this.text.setTransform(-149.95,-43.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1C1C1C").s().p("AwKEdIAAo5MAgVAAAIAAI5g");
	this.shape.setTransform(-99.475,-21.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-202.9,-49.9,233.9,70.7);


(lib.BackB4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("BACK", "37px 'Arial'", "#FFFFFF");
	this.text.lineHeight = 43;
	this.text.lineWidth = 179;
	this.text.parent = this;
	this.text.setTransform(-149.95,-43.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1C1C1C").s().p("AwKEdIAAo5MAgVAAAIAAI5g");
	this.shape.setTransform(-99.475,-21.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-202.9,-49.9,233.9,70.7);


(lib.BackB3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("BACK", "37px 'Arial'", "#FFFFFF");
	this.text.lineHeight = 43;
	this.text.lineWidth = 179;
	this.text.parent = this;
	this.text.setTransform(-149.95,-43.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1C1C1C").s().p("AwKEdIAAo5MAgVAAAIAAI5g");
	this.shape.setTransform(-99.475,-21.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-202.9,-49.9,233.9,70.7);


(lib.BackB2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("BACK", "37px 'Arial'", "#FFFFFF");
	this.text.lineHeight = 43;
	this.text.lineWidth = 179;
	this.text.parent = this;
	this.text.setTransform(-149.95,-43.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1C1C1C").s().p("AwKEdIAAo5MAgVAAAIAAI5g");
	this.shape.setTransform(-99.475,-21.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-202.9,-49.9,233.9,70.7);


(lib.BackB1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("BACK", "37px 'Arial'", "#FFFFFF");
	this.text.lineHeight = 43;
	this.text.lineWidth = 179;
	this.text.parent = this;
	this.text.setTransform(-149.95,-43.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1C1C1C").s().p("AwKEdIAAo5MAgVAAAIAAI5g");
	this.shape.setTransform(-99.475,-21.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-202.9,-49.9,233.9,70.7);


// stage content:
(lib.PalliativeCareFinal = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,40,483,677,1201,1566,1887,1888,1889,1890,1891,1892,1893,1894,1895,2014,2015,3091];
	this.streamSoundSymbolsList[40] = [{id:"bensoundacousticbreeze",startFrame:40,endFrame:1888,loop:1,offset:0}];
	this.streamSoundSymbolsList[1895] = [{id:"bensoundacousticbreeze",startFrame:1895,endFrame:3091,loop:1,offset:77396}];
	this.streamSoundSymbolsList[3091] = [{id:"bensoundacousticbreeze",startFrame:3091,endFrame:3092,loop:0,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		var _this = this;
		
		_this.MainStart.on('click', function(){
		
		_this.gotoAndPlay(21);
			
		});
	}
	this.frame_40 = function() {
		var soundInstance = playSound("bensoundacousticbreeze",0);
		this.InsertIntoSoundStreamData(soundInstance,40,1888,1);
	}
	this.frame_483 = function() {
		var _this = this;
		
		_this.BackB1.on('click', function(){
		
		_this.gotoAndPlay(21);
		});
	}
	this.frame_677 = function() {
		var _this = this;
		
		_this.BackB2.on('click', function(){
		
		_this.gotoAndPlay(484);
		});
	}
	this.frame_1201 = function() {
		var _this = this;
		
		_this.BackB3.on('click', function(){
		
		_this.gotoAndPlay(673);
		});
	}
	this.frame_1566 = function() {
		var _this = this;
		
		_this.BackB4.on('click', function(){
		
		_this.gotoAndPlay(1202);
		});
	}
	this.frame_1887 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay(1888);
		
		
		var _this = this;
		_this.stop();
	}
	this.frame_1888 = function() {
		this.stop();
		
		var _this = this;
		_this.StartScenario.on('click', function(){
		_this.gotoAndPlay(1889);
		
		
		});
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}
	this.frame_1889 = function() {
		this.stop();
		this.stop();
		var _this = this;
		
		_this.p1.on('click', function(){
		
		_this.gotoAndPlay('1890');
			
		_this.stop();
		});
		this.stop();
		var _this = this;
		
		_this.p2.on('click', function(){
		
		_this.gotoAndPlay('1891');
		
		_this.stop();
		});
	}
	this.frame_1890 = function() {
		this.stop();
		this.stop();
		var _this = this;
		
		_this.p3.on('click', function(){
		
		_this.gotoAndPlay('1893');
			
		_this.stop();
		});
	}
	this.frame_1891 = function() {
		this.stop();
		this.stop();
		var _this = this;
		
		_this.p4.on('click', function(){
		
		_this.gotoAndPlay('1892');
			
		_this.stop();
		});
	}
	this.frame_1892 = function() {
		this.stop();
		this.stop();
		var _this = this;
		
		_this.p5.on('click', function(){
		
		_this.gotoAndPlay('1894');
			
		_this.stop();
		});
	}
	this.frame_1893 = function() {
		this.stop();
		this.stop();
		var _this = this;
		
		_this.p6.on('click', function(){
		
		_this.gotoAndPlay('2015');
			
		});
	}
	this.frame_1894 = function() {
		this.stop();
		this.stop();
		var _this = this;
		
		_this.p7.on('click', function(){
		
		_this.gotoAndPlay('1895');
			
		});
	}
	this.frame_1895 = function() {
		var soundInstance = playSound("bensoundacousticbreeze",0,77396);
		this.InsertIntoSoundStreamData(soundInstance,1895,3091,1,77396);
	}
	this.frame_2014 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay('0');
		
		createjs.Sound.stop();
	}
	this.frame_2015 = function() {
		var _this = this;
		
		_this.BackB5.on('click', function(){
		
		_this.gotoAndPlay(1889);
		});
	}
	this.frame_3091 = function() {
		var soundInstance = playSound("bensoundacousticbreeze",-1);
		this.InsertIntoSoundStreamData(soundInstance,3091,3092,0);
		this.stop();
		var _this = this;
		_this.gotoAndPlay('0');
		
		createjs.Sound.stop();
		SoundMixer.stopAll();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(40).call(this.frame_40).wait(443).call(this.frame_483).wait(194).call(this.frame_677).wait(524).call(this.frame_1201).wait(365).call(this.frame_1566).wait(321).call(this.frame_1887).wait(1).call(this.frame_1888).wait(1).call(this.frame_1889).wait(1).call(this.frame_1890).wait(1).call(this.frame_1891).wait(1).call(this.frame_1892).wait(1).call(this.frame_1893).wait(1).call(this.frame_1894).wait(1).call(this.frame_1895).wait(119).call(this.frame_2014).wait(1).call(this.frame_2015).wait(1076).call(this.frame_3091).wait(1));

	// BackB1
	this.BackB1 = new lib.BackB1();
	this.BackB1.name = "BackB1";
	this.BackB1.setTransform(223.25,747.2);
	this.BackB1._off = true;
	new cjs.ButtonHelper(this.BackB1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.BackB1).wait(483).to({_off:false},0).to({_off:true},194).wait(2415));

	// BackB2
	this.BackB2 = new lib.BackB2();
	this.BackB2.name = "BackB2";
	this.BackB2.setTransform(223.25,747.2);
	this.BackB2._off = true;
	new cjs.ButtonHelper(this.BackB2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.BackB2).wait(677).to({_off:false},0).to({_off:true},524).wait(1891));

	// BackB3
	this.BackB3 = new lib.BackB3();
	this.BackB3.name = "BackB3";
	this.BackB3.setTransform(223.25,747.2);
	this.BackB3._off = true;
	new cjs.ButtonHelper(this.BackB3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.BackB3).wait(1201).to({_off:false},0).to({_off:true},365).wait(1526));

	// BackB4
	this.BackB4 = new lib.BackB4();
	this.BackB4.name = "BackB4";
	this.BackB4.setTransform(223.25,747.2);
	this.BackB4._off = true;
	new cjs.ButtonHelper(this.BackB4, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.BackB4).wait(1566).to({_off:false},0).to({_off:true},322).wait(1204));

	// BackB5
	this.BackB5 = new lib.BackB5();
	this.BackB5.name = "BackB5";
	this.BackB5.setTransform(223.25,747.2);
	this.BackB5._off = true;
	new cjs.ButtonHelper(this.BackB5, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.BackB5).wait(2015).to({_off:false},0).wait(1077));

	// MainStart
	this.MainStart = new lib.StartButton();
	this.MainStart.name = "MainStart";
	this.MainStart.setTransform(512.8,539.45,0.6729,0.6729);
	new cjs.ButtonHelper(this.MainStart, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.MainStart).to({_off:true},1).wait(3091));

	// Text1
	this.instance = new lib.JaneIntro("synched",0);
	this.instance.setTransform(501.7,101.8,1,1,0,0,0,4.5,-1.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20).to({_off:false},0).to({alpha:1},19).to({startPosition:0},40).to({alpha:0},15).to({_off:true},1).wait(2997));

	// Text2
	this.instance_1 = new lib.Text2("synched",0);
	this.instance_1.setTransform(505.2,130.5,1,1,0,0,0,8,-102.5);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(94).to({_off:false},0).to({alpha:1},28).to({startPosition:0},63).to({alpha:0},24).to({_off:true},1).wait(2882));

	// Text3
	this.instance_2 = new lib.Text3("synched",0);
	this.instance_2.setTransform(367.8,110.2,1,1,0,0,0,-41.9,-92.7);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(209).to({_off:false},0).to({alpha:1},19).to({startPosition:0},112).to({alpha:0},16).to({_off:true},1).wait(2735));

	// Text4
	this.instance_3 = new lib.Text4("synched",0);
	this.instance_3.setTransform(501.8,150.85,1,1,0,0,0,8,-46);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(356).to({_off:false},0).to({alpha:1},25).to({startPosition:0},76).to({alpha:0},25).to({_off:true},1).wait(2609));

	// Nurse_Intro
	this.instance_4 = new lib.NurseIntroduction();
	this.instance_4.setTransform(-16,0);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(20).to({_off:false},0).wait(462).to({_off:true},1).wait(2609));

	// SpeechBubble
	this.instance_5 = new lib.SpeechBubble("synched",0);
	this.instance_5.setTransform(662.75,199.05,0.7,0.7,0,0,0,1.6,-2.5);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(622).to({_off:false},0).to({alpha:1},12).to({startPosition:0},42).to({_off:true},1).wait(2415));

	// S2Text1
	this.instance_6 = new lib.S2Text1("synched",0);
	this.instance_6.setTransform(514.55,156.25,1,1,0,0,0,6,-21.2);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(483).to({_off:false},0).to({alpha:1},11).to({startPosition:0},110).to({alpha:0},18).to({_off:true},1).wait(2469));

	// Nurse_Anxious
	this.instance_7 = new lib.NurseAnxious();
	this.instance_7.setTransform(-15,0);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(483).to({_off:false},0).wait(193).to({_off:true},1).wait(2415));

	// PatientText1
	this.instance_8 = new lib.PatientText1("synched",0);
	this.instance_8.setTransform(498.05,296.2,1,1,0,0,0,2,20.8);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(677).to({_off:false},0).to({alpha:1},23).to({startPosition:0},42).to({startPosition:0},51).to({alpha:0},15).to({_off:true},1).wait(2283));

	// PatientText2
	this.instance_9 = new lib.PatientText2("synched",0);
	this.instance_9.setTransform(486.7,180,1,1,0,0,0,15.5,-121.2);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(809).to({_off:false},0).to({alpha:1},27).to({startPosition:0},77).to({alpha:0},22).to({_off:true},1).wait(2156));

	// PatienText3
	this.instance_10 = new lib.PatienText3("synched",0);
	this.instance_10.setTransform(525.1,182.25,1,1,0,0,0,1.5,-52.7);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(936).to({_off:false},0).to({alpha:1},21).to({startPosition:0},92).to({alpha:0},28).to({_off:true},1).wait(2014));

	// PatientText4
	this.instance_11 = new lib.PatientText4("synched",0);
	this.instance_11.setTransform(531.7,191.75,1,1,0,0,0,-14,-78.2);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1078).to({_off:false},0).to({alpha:1},24).to({startPosition:0},73).to({alpha:0},25).to({_off:true},1).wait(1891));

	// PatientText5
	this.instance_12 = new lib.PatientText5("synched",0);
	this.instance_12.setTransform(516.7,156.65,1,1,0,0,0,13,-131.7);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1201).to({_off:false},0).to({alpha:1},14).to({startPosition:0},52).to({alpha:0},13).to({_off:true},1).wait(1811));

	// Marriage
	this.instance_13 = new lib.Marriage("synched",0);
	this.instance_13.setTransform(188.3,603.35,1,1,0,0,0,2,28.4);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1281).to({_off:false},0).to({alpha:1},24).to({startPosition:0},16).to({startPosition:0},222).to({alpha:0},22).to({_off:true},1).wait(1526));

	// Son
	this.instance_14 = new lib.Son("synched",0);
	this.instance_14.setTransform(266.7,315,1,1,0,0,0,6,-29.4);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1321).to({_off:false},0).to({alpha:1},30).to({startPosition:0},15).to({startPosition:0},177).to({alpha:0},22).to({_off:true},1).wait(1526));

	// Gardening
	this.instance_15 = new lib.Gardening("synched",0);
	this.instance_15.setTransform(490.05,115.15,1,1,0,0,0,-8.5,-49.9);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1366).to({_off:false},0).to({alpha:1},25).to({startPosition:0},12).to({startPosition:0},140).to({alpha:0},22).to({_off:true},1).wait(1526));

	// Daughter
	this.instance_16 = new lib.Daughter("synched",0);
	this.instance_16.setTransform(798.4,258.35,1,1,0,0,0,7,-74);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1403).to({_off:false},0).to({alpha:1},25).to({startPosition:0},115).to({alpha:0},22).to({_off:true},1).wait(1526));

	// Friends
	this.instance_17 = new lib.Friends_1("synched",0);
	this.instance_17.setTransform(841.75,538.3,1,1,0,0,0,-3,10.5);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1434).to({_off:false},0).to({alpha:1},23).to({startPosition:0},86).to({alpha:0},22).to({_off:true},1).wait(1526));

	// patient
	this.instance_18 = new lib.Patient();
	this.instance_18.setTransform(387,271);

	this.instance_19 = new lib.Tween2("synched",0);
	this.instance_19.setTransform(528.5,490.5);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_18}]},677).to({state:[{t:this.instance_19}]},573).to({state:[{t:this.instance_19}]},39).to({state:[{t:this.instance_19}]},254).to({state:[{t:this.instance_19}]},22).to({state:[]},1).wait(1526));
	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1250).to({_off:false},0).to({scaleX:1.42,scaleY:1.42},39).to({startPosition:0},254).to({alpha:0},22).to({_off:true},1).wait(1526));

	// Text1
	this.instance_20 = new lib.PrologueText1("synched",0);
	this.instance_20.setTransform(373.5,176,1,1,0,0,0,36.5,-94.7);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1566).to({_off:false},0).to({alpha:1},23).to({startPosition:0},103).to({alpha:0},17).to({_off:true},1).wait(1382));

	// Text2
	this.instance_21 = new lib.PrologueText2("synched",0);
	this.instance_21.setTransform(440,177.95,1,1,0,0,0,36.5,-119.7);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1710).to({_off:false},0).to({alpha:1},20).to({startPosition:0},54).to({alpha:0},20).to({_off:true},1).wait(1287));

	// Text3
	this.instance_22 = new lib.PrologueText3("synched",0);
	this.instance_22.setTransform(375.45,187.7,1,1,0,0,0,-123.5,-119.7);
	this.instance_22.alpha = 0;
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1805).to({_off:false},0).to({alpha:1},15).to({startPosition:0},67).to({_off:true},1).wait(1204));

	// Prologue
	this.instance_23 = new lib.HospitalBed();
	this.instance_23.setTransform(-24,0);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1566).to({_off:false},0).wait(321).to({_off:true},1).wait(1204));

	// StartScenario
	this.StartScenario = new lib.StartScenario();
	this.StartScenario.name = "StartScenario";
	this.StartScenario.setTransform(492.5,570.45,0.68,0.68);
	this.StartScenario._off = true;
	new cjs.ButtonHelper(this.StartScenario, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.StartScenario).wait(1888).to({_off:false},0).to({_off:true},1).wait(1203));

	// Scene1
	this.instance_24 = new lib.Asset1();
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1889).to({_off:false},0).to({_off:true},1).wait(1202));

	// Button1
	this.p1 = new lib.p1();
	this.p1.name = "p1";
	this.p1.setTransform(247.9,687.25);
	this.p1._off = true;
	new cjs.ButtonHelper(this.p1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.p1).wait(1889).to({_off:false},0).to({_off:true},1).wait(1202));

	// Button2
	this.p2 = new lib.p2();
	this.p2.name = "p2";
	this.p2.setTransform(850.45,685.3);
	this.p2._off = true;
	new cjs.ButtonHelper(this.p2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.p2).wait(1889).to({_off:false},0).to({_off:true},1).wait(1202));

	// Scene2
	this.instance_25 = new lib.Asset2();
	this.instance_25.setTransform(-15,9);
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1890).to({_off:false},0).to({_off:true},1).wait(1201));

	// Button3
	this.p3 = new lib.p3();
	this.p3.name = "p3";
	this.p3.setTransform(857.1,680.95);
	this.p3._off = true;
	new cjs.ButtonHelper(this.p3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.p3).wait(1890).to({_off:false},0).to({_off:true},1).wait(1201));

	// Scene3
	this.instance_26 = new lib.Asset3();
	this.instance_26.setTransform(-26,0);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1891).to({_off:false},0).to({_off:true},1).wait(1200));

	// Button4
	this.p4 = new lib.p4();
	this.p4.name = "p4";
	this.p4.setTransform(879.75,680.95);
	this.p4._off = true;
	new cjs.ButtonHelper(this.p4, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.p4).wait(1891).to({_off:false},0).to({_off:true},1).wait(1200));

	// Scene4
	this.instance_27 = new lib.Asset4();
	this.instance_27.setTransform(-87,10);
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1892).to({_off:false},0).to({_off:true},1).wait(1199));

	// Button5
	this.p5 = new lib.p5();
	this.p5.name = "p5";
	this.p5.setTransform(868.4,696.05);
	this.p5._off = true;
	new cjs.ButtonHelper(this.p5, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.p5).wait(1892).to({_off:false},0).to({_off:true},1).wait(1199));

	// Scene5
	this.instance_28 = new lib.Nextcopy("synched",0);
	this.instance_28.setTransform(875,678,1,1,0,0,0,7,1.1);

	this.instance_29 = new lib.Asset5();
	this.instance_29.setTransform(-42,-8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AvxDrIAAnVIfjAAIAAHVg");
	this.shape.setTransform(883,672.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape},{t:this.instance_29},{t:this.instance_28}]},1893).to({state:[]},1).wait(1198));

	// Button6
	this.p6 = new lib.p6();
	this.p6.name = "p6";
	this.p6.setTransform(866.55,665.9);
	this.p6._off = true;
	new cjs.ButtonHelper(this.p6, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.p6).wait(1893).to({_off:false},0).to({_off:true},1).wait(1198));

	// Scene6
	this.instance_30 = new lib.Next("synched",0);
	this.instance_30.setTransform(877,671,1,1,0,0,0,7,1.1);

	this.instance_31 = new lib.Asset6();
	this.instance_31.setTransform(-52,-23);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_31},{t:this.instance_30}]},1894).to({state:[]},1).wait(1197));

	// Button7
	this.p7 = new lib.p7();
	this.p7.name = "p7";
	this.p7.setTransform(868.4,673.4);
	this.p7._off = true;
	new cjs.ButtonHelper(this.p7, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.p7).wait(1894).to({_off:false},0).to({_off:true},1).wait(1197));

	// Sppech1
	this.instance_32 = new lib.ThankYou("synched",0);
	this.instance_32.setTransform(506.4,238.5,0.48,0.48,0,0,0,1.6,1.7);
	this.instance_32.alpha = 0;
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(1895).to({_off:false},0).to({alpha:1},29).to({startPosition:0},90).to({_off:true},1).wait(1077));

	// EP1
	this.instance_33 = new lib.HospitalBed2();
	this.instance_33.setTransform(-18,0);
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(1895).to({_off:false},0).wait(119).to({_off:true},1).wait(1077));

	// EpText1
	this.instance_34 = new lib.EpText1("synched",0);
	this.instance_34.setTransform(416.65,323.5,1,1,0,0,0,-5,-105.8);
	this.instance_34.alpha = 0;
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(2015).to({_off:false},0).to({alpha:1},15).to({startPosition:0},195).to({alpha:0},16).to({_off:true},1).wait(850));

	// EPText2
	this.instance_35 = new lib.EpText2("synched",0);
	this.instance_35.setTransform(491.2,281.6,1,1,0,0,0,-5,-18.3);
	this.instance_35.alpha = 0;
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(2242).to({_off:false},0).to({alpha:1},13).to({startPosition:0},557).to({alpha:0},13).to({_off:true},1).wait(266));

	// EPText3
	this.instance_36 = new lib.EpText3("synched",0);
	this.instance_36.setTransform(493.4,289.35,1,1,0,0,0,-5,-74.8);
	this.instance_36.alpha = 0;
	this.instance_36._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(2826).to({_off:false},0).to({alpha:1},25).to({startPosition:0},227).to({alpha:0},13).wait(1));

	// Ep2
	this.instance_37 = new lib.JaneAlone();
	this.instance_37.setTransform(-22,0);
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(2015).to({_off:false},0).wait(1077));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1050,814);
// library properties:
lib.properties = {
	id: '976A4B431729B34FA6EA46F247EC33CB',
	width: 1024,
	height: 768,
	fps: 24,
	color: "#6ABEC4",
	opacity: 1.00,
	manifest: [
		{src:"images/scenario1_atlas_1.png", id:"scenario1_atlas_1"},
		{src:"images/scenario1_atlas_2.png", id:"scenario1_atlas_2"},
		{src:"images/scenario1_atlas_3.png", id:"scenario1_atlas_3"},
		{src:"images/scenario1_atlas_4.png", id:"scenario1_atlas_4"},
		{src:"images/scenario1_atlas_5.png", id:"scenario1_atlas_5"},
		{src:"images/scenario1_atlas_6.png", id:"scenario1_atlas_6"},
		{src:"sounds/bensoundacousticbreeze.mp3", id:"bensoundacousticbreeze"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['976A4B431729B34FA6EA46F247EC33CB'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;