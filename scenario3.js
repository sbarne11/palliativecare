(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Scenario3_atlas_1", frames: [[266,504,392,394],[293,900,170,642],[0,1113,291,524],[637,900,163,608],[0,504,264,607],[769,0,304,555],[465,900,170,636],[660,557,347,249],[0,0,767,502]]},
		{name:"Scenario3_atlas_2", frames: [[748,700,746,724],[0,685,746,734],[1045,0,973,698],[0,1421,741,572],[743,1426,767,502],[0,0,1043,683]]},
		{name:"Scenario3_atlas_3", frames: [[0,720,1043,683],[0,0,1046,718]]},
		{name:"Scenario3_atlas_4", frames: [[0,0,1024,768],[0,770,1024,768]]},
		{name:"Scenario3_atlas_5", frames: [[0,0,1046,774],[0,776,1027,768]]}
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



(lib.Background = function() {
	this.initialize(ss["Scenario3_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Background2 = function() {
	this.initialize(ss["Scenario3_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap21 = function() {
	this.initialize(ss["Scenario3_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.brushing = function() {
	this.initialize(ss["Scenario3_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.burshing2 = function() {
	this.initialize(ss["Scenario3_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.careafterdeath = function() {
	this.initialize(ss["Scenario3_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.endoflife = function() {
	this.initialize(ss["Scenario3_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Face2Face = function() {
	this.initialize(ss["Scenario3_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.familytogether = function() {
	this.initialize(ss["Scenario3_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Jane_Thinking = function() {
	this.initialize(ss["Scenario3_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.JaneSitting = function() {
	this.initialize(ss["Scenario3_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Karen_Peaceful = function() {
	this.initialize(ss["Scenario3_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.nonverbal = function() {
	this.initialize(ss["Scenario3_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Nurse1 = function() {
	this.initialize(ss["Scenario3_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Nurse1_shoulder = function() {
	this.initialize(ss["Scenario3_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Nurse1Sitting = function() {
	this.initialize(ss["Scenario3_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.NurseJane = function() {
	this.initialize(ss["Scenario3_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Presence1 = function() {
	this.initialize(ss["Scenario3_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Speechbubble = function() {
	this.initialize(ss["Scenario3_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.verbal = function() {
	this.initialize(ss["Scenario3_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.Writteb = function() {
	this.initialize(ss["Scenario3_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween121 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap21();
	this.instance.setTransform(-50.95,-51.2,0.26,0.26);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50.9,-51.2,101.9,102.5);


(lib.Tween120 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.NurseJane();
	this.instance.setTransform(68.85,-257.55,0.81,0.81,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.8,-257.5,137.7,515.1);


(lib.Tween119 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.familytogether();
	this.instance.setTransform(-364.85,-261.75,0.75,0.75);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-364.8,-261.7,729.7,523.5);


(lib.Tween118 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.burshing2();
	this.instance.setTransform(-279.75,-275.25,0.75,0.75);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-279.7,-275.2,559.5,550.5);


(lib.Tween117 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Background();
	this.instance.setTransform(-523,-387);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-523,-387,1046,774);


(lib.Tween116 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.brushing();
	this.instance.setTransform(-279.75,-271.5,0.75,0.75);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-279.7,-271.5,559.5,543);


(lib.Tween115 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Jane can support the family… offers to make them refreshments … and sits with Karen while they take a short break", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 896;
	this.text.parent = this;
	this.text.setTransform(0,-85.8);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-449.9,-87.8,899.9,175.7);


(lib.Tween114 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Jane knows to continue chatting to Karen when she is delivering this care… Karen may still hear her… and recognise her voice…", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 893;
	this.text.parent = this;
	this.text.setTransform(0,-70.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-448.7,-72.3,897.4,144.7);


(lib.Tween113 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Jane feels empowered to continue delivering the fundamental nursing care that Karen requires at end of life", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 891;
	this.text.parent = this;
	this.text.setTransform(0,-79.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-447.3,-81.8,894.7,163.7);


(lib.Tween112 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.NurseJane();
	this.instance.setTransform(-68,-254.4,0.8,0.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68,-254.4,136,508.8);


(lib.Tween111 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.endoflife();
	this.instance.setTransform(-512,-384);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-512,-384,1024,768);


(lib.Tween110 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.careafterdeath();
	this.instance.setTransform(-512,-384);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-512,-384,1024,768);


(lib.Tween109 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.careafterdeath();
	this.instance.setTransform(-512,-384);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-512,-384,1024,768);


(lib.Tween108 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Last offices & Care After Death", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 582;
	this.text.parent = this;
	this.text.setTransform(0,-46.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-293.2,-48.5,586.4,97.1);


(lib.Tween107 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•She would like to carry out last offices when Karen dies, as delivering nursing care for Karen for the final time would be a privilege ", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 687;
	this.text.parent = this;
	this.text.setTransform(-343.7,-108.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-345.7,-110.6,691.4,221.3);


(lib.Tween106 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•She would like to carry out last offices when Karen dies, as delivering nursing care for Karen for the final time would be a privilege ", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 687;
	this.text.parent = this;
	this.text.setTransform(-343.7,-108.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-345.7,-110.6,691.4,221.3);


(lib.Tween105 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•That Jane feels safe in terms of expressing how she is dealing with a death of a patient for the first time", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 658;
	this.text.parent = this;
	this.text.setTransform(-328.9,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-330.9,-88.7,661.8,177.4);


(lib.Tween104 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•That Jane feels safe in terms of expressing how she is dealing with a death of a patient for the first time", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 658;
	this.text.parent = this;
	this.text.setTransform(-328.9,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-330.9,-88.7,661.8,177.4);


(lib.Tween103 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•That Karen is comfortable and her family are supported", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 631;
	this.text.parent = this;
	this.text.setTransform(-315.6,-64.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-317.6,-66.7,635.3,133.5);


(lib.Tween102 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•That Karen is comfortable and her family are supported", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 631;
	this.text.parent = this;
	this.text.setTransform(-315.6,-64.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-317.6,-66.7,635.3,133.5);


(lib.Tween101 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("What is important to Jane:", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 679;
	this.text.parent = this;
	this.text.setTransform(0,-30.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-341.4,-32.6,682.9,65.30000000000001);


(lib.Tween100 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("What is important to Jane:", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 679;
	this.text.parent = this;
	this.text.setTransform(0,-30.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-341.4,-32.6,682.9,65.30000000000001);


(lib.Tween99 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("What is important to Karen & Her family:", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 775;
	this.text.parent = this;
	this.text.setTransform(0,-42.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-389.6,-44.8,779.3,89.69999999999999);


(lib.Tween98 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("What is important to Karen & Her family:", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 775;
	this.text.parent = this;
	this.text.setTransform(0,-42.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-389.6,-44.8,779.3,89.69999999999999);


(lib.Tween97 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Having her family around her. Her son is home from Australia", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 687;
	this.text.parent = this;
	this.text.setTransform(-343.7,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-345.7,-88.7,691.4,177.4);


(lib.Tween96 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Having her family around her. Her son is home from Australia", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 687;
	this.text.parent = this;
	this.text.setTransform(-343.7,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-345.7,-88.7,691.4,177.4);


(lib.Tween95 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Her friends: FaceTime and phoned", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 582;
	this.text.parent = this;
	this.text.setTransform(-291.15,-26.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-293.1,-28.2,586.3,84.2);


(lib.Tween94 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Her friends: FaceTime and phoned", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 582;
	this.text.parent = this;
	this.text.setTransform(-291.15,-26.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-293.1,-28.2,586.3,84.2);


(lib.Tween92 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Pictures of her garden ", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 493;
	this.text.parent = this;
	this.text.setTransform(-246.45,-23.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-248.4,-25.6,496.9,51.3);


(lib.Tween91 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•That she is safe in the care of the staff on the ward", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 552;
	this.text.parent = this;
	this.text.setTransform(-276.15,-48.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-278.1,-50.2,556.3,100.4);


(lib.Tween90 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•That she is safe in the care of the staff on the ward", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 552;
	this.text.parent = this;
	this.text.setTransform(-276.15,-48.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-278.1,-50.2,556.3,100.4);


(lib.Tween89 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Consider the patient and family as a unity in delivering care", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 545;
	this.text.parent = this;
	this.text.setTransform(-272.65,-71.1);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-274.6,-73.1,549.3,146.3);


(lib.Tween88 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Consider the patient and family as a unity in delivering care", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 545;
	this.text.parent = this;
	this.text.setTransform(-272.65,-71.1);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-274.6,-73.1,549.3,146.3);


(lib.Tween87 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Allow family involvement in the care delivery, with Karen’s consent, and if they so wish", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 608;
	this.text.parent = this;
	this.text.setTransform(-304.2,-64.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-306.2,-66.7,612.5,133.5);


(lib.Tween86 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Allow family involvement in the care delivery, with Karen’s consent, and if they so wish", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 608;
	this.text.parent = this;
	this.text.setTransform(-304.2,-64.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-306.2,-66.7,612.5,133.5);


(lib.Tween85 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Be sensitive to the spiritual needs of Karen, creating an environment in which she feels safe", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 640;
	this.text.parent = this;
	this.text.setTransform(-320,-64.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-322,-66.7,644.1,133.5);


(lib.Tween84 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Be sensitive to the spiritual needs of Karen, creating an environment in which she feels safe", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 640;
	this.text.parent = this;
	this.text.setTransform(-320,-64.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-322,-66.7,644.1,133.5);


(lib.Tween83 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Ensure privacy is provided for Karen and her family as much as possible", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 642;
	this.text.parent = this;
	this.text.setTransform(-320.9,-64.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-322.9,-66.7,645.8,133.5);


(lib.Tween82 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Ensure privacy is provided for Karen and her family as much as possible", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 642;
	this.text.parent = this;
	this.text.setTransform(-320.9,-64.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-322.9,-66.7,645.8,133.5);


(lib.Tween81 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Ensure the Spiritual & Cultural Needs of Karen and her family are met", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 828;
	this.text.parent = this;
	this.text.setTransform(0,-81.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-415.9,-83.6,831.9,167.3);


(lib.Tween80 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Listen for audible chest secretions or any distress in her breathing", "bold 35px 'Leelawadee'");
	this.text.lineHeight = 44;
	this.text.lineWidth = 632;
	this.text.parent = this;
	this.text.setTransform(-315.75,-62.35);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-317.7,-64.3,635.5,128.7);


(lib.Tween79 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Listen for audible chest secretions or any distress in her breathing", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 632;
	this.text.parent = this;
	this.text.setTransform(-315.75,-8.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-317.7,-10.2,635.5,128.7);


(lib.Tween78 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Observe & Monitor Karen’s Respiratory condition", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 849;
	this.text.parent = this;
	this.text.setTransform(0,-72.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.5,-74.8,853,149.7);


(lib.Tween77 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Monitor and record bowel pattern; record of last bowel movement ", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 575;
	this.text.parent = this;
	this.text.setTransform(-287.7,-16.95);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-289.7,-18.9,579.4,133.5);


(lib.Tween76 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Monitor and record bowel pattern; record of last bowel movement ", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 575;
	this.text.parent = this;
	this.text.setTransform(-287.7,-16.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-289.7,-18.8,579.4,133.5);


(lib.Tween75 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Maintain record on urinary output", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 574;
	this.text.parent = this;
	this.text.setTransform(-286.8,-17.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-288.8,-19.7,577.6,127);


(lib.Tween74 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Maintain record on urinary output", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 574;
	this.text.parent = this;
	this.text.setTransform(-286.8,-17.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-288.8,-19.5,577.6,126.9);


(lib.Tween73 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Use incontinence pads if required, check regularly", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 612;
	this.text.parent = this;
	this.text.setTransform(-305.95,-29.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-307.9,-31.2,615.9,137.5);


(lib.Tween72 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Use incontinence pads if required, check regularly", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 612;
	this.text.parent = this;
	this.text.setTransform(-305.95,-29.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-307.9,-31.2,615.9,137.5);


(lib.Tween71 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Provide urinary catheter care", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 640;
	this.text.parent = this;
	this.text.setTransform(-320.1,-16.1);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-322.1,-18.1,644.3,111.19999999999999);


(lib.Tween70 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Provide urinary catheter care", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 640;
	this.text.parent = this;
	this.text.setTransform(-320.1,-16.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-322.1,-18,644.3,111.2);


(lib.Tween69 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Consider need for urinary catheter if incontinence or retention are a concern", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 735;
	this.text.parent = this;
	this.text.setTransform(-367.35,-31.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-369.3,-33.4,738.7,133.5);


(lib.Tween68 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Consider need for urinary catheter if incontinence or retention are a concern", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 735;
	this.text.parent = this;
	this.text.setTransform(-367.35,-31.4);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-369.3,-33.4,738.7,133.6);


(lib.Tween67 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Assist with Karen’s elimination needs", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 751;
	this.text.parent = this;
	this.text.setTransform(0,9.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-377.4,7.5,754.8,53);


(lib.Tween66 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Consider artificial hydration as condition dictates", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 549;
	this.text.parent = this;
	this.text.setTransform(-274.5,-32.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-276.5,-34,553.1,151.5);


(lib.Tween65 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Observe for signs of aspiration such as coughing when taking drinks", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 547;
	this.text.parent = this;
	this.text.setTransform(-273.5,-31.4);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-275.5,-33.4,551.1,133.6);


(lib.Tween64 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Monitor and provide oral hydration as tolerated by Karen", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 860;
	this.text.parent = this;
	this.text.setTransform(0,-48.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-431.7,-50.7,863.5,158.5);


(lib.Tween63 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Ensure appropriate pressure relieving aids are used", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 651;
	this.text.parent = this;
	this.text.setTransform(-325.25,-6.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-327.2,-8.7,654.5,121.7);


(lib.Tween62 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Monitor skin integrity, re-evaluate Waterlow assessment as needed", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 623;
	this.text.parent = this;
	this.text.setTransform(-311.25,2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-313.2,0,626.5,89.7);


(lib.Tween61 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Re-position Karen regularly as per local policy or as the patients condition dictates", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 828;
	this.text.parent = this;
	this.text.setTransform(0,-43.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-415.9,-45.1,831.9,144.5);


(lib.Tween60 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Regular oral assessment and oral care", "italic 35px 'Arial'");
	this.text.lineHeight = 41;
	this.text.lineWidth = 472;
	this.text.parent = this;
	this.text.setTransform(-235.8,-45.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-237.8,-47.7,475.70000000000005,95.4);


(lib.Tween59 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("•Providing eye care", "italic 35px 'Arial'");
	this.text.textAlign = "center";
	this.text.lineHeight = 41;
	this.text.lineWidth = 382;
	this.text.parent = this;
	this.text.setTransform(0,-21.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-193.1,-23.9,386.2,47.8);


(lib.Tween58 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("To assist Karen with hygiene needs:", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 732;
	this.text.parent = this;
	this.text.setTransform(0,-79.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-367.7,-81.9,735.5,163.8);


(lib.Tween57 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("To assist Karen with hygiene needs:", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 732;
	this.text.parent = this;
	this.text.setTransform(0,-79.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-367.7,-81.9,735.5,163.8);


(lib.Tween56 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("The goal of care is to ensure a peaceful and comfortable death as possible", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 803;
	this.text.parent = this;
	this.text.setTransform(0,-68.5);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-403.7,-70.5,807.4,141);


(lib.Tween55 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Karen’s Dying & Spiritual Needs at end of life ", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 781;
	this.text.parent = this;
	this.text.setTransform(0,-42.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-392.4,-44.8,784.9,89.69999999999999);


(lib.Tween54 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("End of Life Nursing Care Priorities: ", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 721;
	this.text.parent = this;
	this.text.setTransform(0,-81.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-362.6,-83.6,725.3,167.3);


(lib.Tween53 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("End of Life Nursing Care Priorities: ", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 721;
	this.text.parent = this;
	this.text.setTransform(0,-81.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-362.6,-83.6,725.3,167.3);


(lib.Tween52 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Presence1();
	this.instance.setTransform(-161,-115,0.32,0.32);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-161,-115,334.7,229.8);


(lib.Tween51 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Face2Face();
	this.instance.setTransform(-124,-129,0.3,0.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124,-129,312.9,204.9);


(lib.Tween50 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Writteb();
	this.instance.setTransform(-125.15,-81.95,0.24,0.24);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-125.1,-81.9,250.3,163.9);


(lib.Tween49 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.nonverbal();
	this.instance.setTransform(-157.2,-102.9,0.41,0.41);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-157.2,-102.9,314.5,205.8);


(lib.Tween48 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.verbal();
	this.instance.setTransform(-153.4,-100.4,0.4,0.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-153.4,-100.4,306.8,200.8);


(lib.Tween47 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Nurse1Sitting();
	this.instance.setTransform(-123.1,-224.75,0.81,0.81);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-123.1,-224.7,246.3,449.5);


(lib.Tween45 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.JaneSitting();
	this.instance.setTransform(-122.2,-220.05,0.84,0.84);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.2,-220,244.5,440.1);


(lib.Tween44 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("The preceptor discusses with Jane the types of communication used in practice", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 808;
	this.text.parent = this;
	this.text.setTransform(0,-68.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-406.2,-70.9,812.5,141.9);


(lib.Tween43 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Hope and meaning", "bold 25px 'Leelawadee'");
	this.text.lineHeight = 32;
	this.text.lineWidth = 248;
	this.text.parent = this;
	this.text.setTransform(-124,-43.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-126,-45.2,252.1,90.5);


(lib.Tween42 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("To hope and meaning to one's life", "bold 25px 'Leelawadee'");
	this.text.lineHeight = 32;
	this.text.lineWidth = 259;
	this.text.parent = this;
	this.text.setTransform(-124,-43.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-126,-45.2,262.8,129.60000000000002);


(lib.Tween40 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("To convey acceptance and affirmation", "bold 25px 'Leelawadee'");
	this.text.lineHeight = 32;
	this.text.lineWidth = 283;
	this.text.parent = this;
	this.text.setTransform(-141.35,-46.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-143.3,-48.8,286.70000000000005,97.69999999999999);


(lib.Tween39 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("To convey acceptance and affirmation", "bold 25px 'Leelawadee'");
	this.text.lineHeight = 32;
	this.text.lineWidth = 283;
	this.text.parent = this;
	this.text.setTransform(-141.35,-46.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-143.3,-48.8,286.70000000000005,97.69999999999999);


(lib.Tween38 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("To give patients and families a direction in which to move", "bold 25px 'Leelawadee'");
	this.text.lineHeight = 32;
	this.text.lineWidth = 296;
	this.text.parent = this;
	this.text.setTransform(-173.3,-46.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175.3,-48.8,299.70000000000005,155.5);


(lib.Tween37 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("To give patients and families a direction in which to move", "bold 25px 'Leelawadee'");
	this.text.lineHeight = 32;
	this.text.lineWidth = 265;
	this.text.parent = this;
	this.text.setTransform(-173.3,-46.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175.3,-48.8,268.6,146.6);


(lib.Tween36 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("To enhance relationships", "bold 25px 'Leelawadee'");
	this.text.lineHeight = 32;
	this.text.lineWidth = 382;
	this.text.parent = this;
	this.text.setTransform(-191,-30.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-193,-32.9,386,65.8);


(lib.Tween35 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("To enhance relationships", "bold 25px 'Leelawadee'");
	this.text.lineHeight = 32;
	this.text.lineWidth = 382;
	this.text.parent = this;
	this.text.setTransform(-191,-30.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-193,-32.9,386,65.8);


(lib.Tween34 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("To reduce uncertainty", "bold 25px 'Leelawadee'");
	this.text.lineHeight = 32;
	this.text.lineWidth = 372;
	this.text.parent = this;
	this.text.setTransform(-186.15,-30.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-188.1,-32.9,376.29999999999995,65.8);


(lib.Tween33 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("To reduce uncertainty", "bold 25px 'Leelawadee'");
	this.text.lineHeight = 32;
	this.text.lineWidth = 372;
	this.text.parent = this;
	this.text.setTransform(-186.15,-30.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-188.1,-32.9,376.29999999999995,65.8);


(lib.Tween32 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Jane & her preceptor reflect on the aim of communication in palliative care practice:", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 800;
	this.text.parent = this;
	this.text.setTransform(0,-59.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-402.1,-61.2,804.2,122.5);


(lib.Tween31 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Jane & her preceptor reflect on the aim of communication in palliative care practice:", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 800;
	this.text.parent = this;
	this.text.setTransform(0,-59.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-402.1,-61.2,804.2,122.5);


(lib.Tween30 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Background();
	this.instance.setTransform(-523,-387);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-523,-387,1046,774);


(lib.Tween29 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Nurse1_shoulder();
	this.instance.setTransform(-106.9,-245.8,0.81,0.81);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-106.9,-245.8,213.9,491.70000000000005);


(lib.Tween28 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Jane discusses her concerns with her preceptor", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 615;
	this.text.parent = this;
	this.text.setTransform(0,-54.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-309.7,-56.5,619.4,113.1);


(lib.Tween27 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Nurse1();
	this.instance.setTransform(-66,-246.25,0.81,0.81);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66,-246.2,132.1,492.5);


(lib.Tween26 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Background2();
	this.instance.setTransform(-513.5,-384);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-513.5,-384,1027,768);


(lib.Tween25 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Background2();
	this.instance.setTransform(-513.5,-384);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-513.5,-384,1027,768);


(lib.Tween24 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("I am worried that when I go into the room, I will say the wrong thing, and I will get upset when she dies…", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 463;
	this.text.parent = this;
	this.text.setTransform(-222.227,-50.8,0.71,0.71);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_2
	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-26.3,-125,1.1289,1.1289,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-418,-125,391.7,281.1);


(lib.Tween23 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Her family are staying at her bedside now… \nI see that brings them all comfort", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 380;
	this.text.parent = this;
	this.text.setTransform(-226.3687,-68.8,0.82,0.82);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_2
	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-42.95,-128,1.0578,1.0578,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-410,-128,367.1,263.4);


(lib.Tween22 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("I miss the conversations that we used to have as she is sleeping almost all of the time", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 367;
	this.text.parent = this;
	this.text.setTransform(-222.45,-113.3841,0.88,0.88);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_2
	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-39.6,-130,1.056,1.056,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-406,-130,366.4,263);


(lib.Tween20 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Karen is so weak now and is requiring full nursing care", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 293;
	this.text.parent = this;
	this.text.setTransform(-209.95,-81.1);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_2
	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-35.6,-124,1.03,1.03,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-393,-124,357.4,262.2);


(lib.Tween17 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Jane_Thinking();
	this.instance.setTransform(-68,-256.8,0.8,0.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68,-256.8,136,513.6);


(lib.Tween16 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Karen loves having her family around her at the bedside", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 520;
	this.text.parent = this;
	this.text.setTransform(0,-75.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-261.9,-77.4,523.9,154.9);


(lib.Tween15 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("She is comfortable", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 453;
	this.text.parent = this;
	this.text.setTransform(0,-55.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-228.5,-57.4,457.1,114.9);


(lib.Tween14 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Karen is sleeping most of the time ", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 516;
	this.text.parent = this;
	this.text.setTransform(0,-57.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-260,-59,520,118.1);


(lib.Tween13 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Karen is no longer able to swallow", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 440;
	this.text.parent = this;
	this.text.setTransform(0,-64.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-222.1,-66.7,444.2,133.5);


(lib.Tween12 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Karen is no longer able to swallow", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 440;
	this.text.parent = this;
	this.text.setTransform(0,-64.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-222.1,-66.7,444.2,133.5);


(lib.Tween10 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Karen has become weaker and is now in bed ", "bold 37px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 46;
	this.text.lineWidth = 569;
	this.text.parent = this;
	this.text.setTransform(0,-69.5);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-286.5,-71.5,573.1,143.1);


(lib.Tween9 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Karen has become weaker and is now in bed ", "bold 37px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 46;
	this.text.lineWidth = 569;
	this.text.parent = this;
	this.text.setTransform(0,-69.5);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-286.5,-71.5,573.1,143.1);


(lib.Tween8 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Karen has become weaker and is now in bed ", "bold 37px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 46;
	this.text.lineWidth = 569;
	this.text.parent = this;
	this.text.setTransform(0,-69.5);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-286.5,-71.5,573.1,143.1);


(lib.Tween7 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Karen has become weaker and is now in bed ", "bold 37px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 46;
	this.text.lineWidth = 569;
	this.text.parent = this;
	this.text.setTransform(0,-69.5);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-286.5,-71.5,573.1,143.1);


(lib.Tween4 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Karen_Peaceful();
	this.instance.setTransform(-370.5,-286);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-370.5,-286,741,572);


(lib.Tween3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Karen_Peaceful();
	this.instance.setTransform(-370.5,-286);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-370.5,-286,741,572);


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
	this.text = new cjs.Text("START", "bold 54px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 67;
	this.text.lineWidth = 443;
	this.text.parent = this;
	this.text.setTransform(6.5,-35.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("A2tI6QiCAAhdh2Qhdh1AAilIAAlTQAAilBdh2QBdh1CCAAMAtaAAAQCDAABcB1QBdB2AAClIAAFdQAACihaBxQhaBziAAAg");
	this.shape.setTransform(2,-2.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-216.9,-59.9,446.9,114);


(lib.SpeechB6 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("I love my flowers", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 244;
	this.text.parent = this;
	this.text.setTransform(31,-38.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_1
	this.text_1 = new cjs.Text("", "35px 'Leelawadee-Bold'");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 44;
	this.text_1.lineWidth = 355;
	this.text_1.parent = this;
	this.text_1.setTransform(34.5,-38.45);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-117,-97,0.84,0.84);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145,-97,359,234);


(lib.SpeechB5 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("They are just like you described", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 244;
	this.text.parent = this;
	this.text.setTransform(31,-63.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_1
	this.text_1 = new cjs.Text("", "35px 'Leelawadee-Bold'");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 44;
	this.text_1.lineWidth = 355;
	this.text_1.parent = this;
	this.text_1.setTransform(34.5,-38.45);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-117,-97,0.84,0.84);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145,-97,359,234);


(lib.SpeechB4 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("I love those flowers", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 199;
	this.text.parent = this;
	this.text.setTransform(30.5,-45.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_1
	this.text_1 = new cjs.Text("", "35px 'Leelawadee-Bold'");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 44;
	this.text_1.lineWidth = 355;
	this.text_1.parent = this;
	this.text_1.setTransform(34.5,-38.45);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-117,-97,0.84,0.84);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145,-97,359,234);


(lib.SpeechB3 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Exploring this may put your mind at ease", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 355;
	this.text.parent = this;
	this.text.setTransform(33.5,-55.2);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-152,-122,1.04,1.04);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-152,-122,365,259);


(lib.SpeechB2 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Lets explore end of life nursing care and the priorities for Karen", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 355;
	this.text.parent = this;
	this.text.setTransform(28.5,-79.2);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-173,-137,1.16,1.16);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-173,-137,402.5,288.9);


(lib.SpeechB1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Let’s take some time to chat this through", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 270;
	this.text.parent = this;
	this.text.setTransform(27,-61.5);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(202,-117,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145,-117,347,249);


(lib.EOLB3 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("What is important to Jane?\n ", "bold 51px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 63;
	this.text.lineWidth = 702;
	this.text.parent = this;
	this.text.setTransform(31,-67.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Eg8igOwMB5FAAAIAAdhMh5FAAAg");
	this.shape.setTransform(31.525,-6.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#205157").s().p("Eg8iAOxIAA9hMB5FAAAIAAdhg");
	this.shape_1.setTransform(31.525,-6.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-356.9,-101.9,776.9,329.5);


(lib.EOLB2 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("What is important to Karen & her family?\n ", "bold 51px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 63;
	this.text.lineWidth = 702;
	this.text.parent = this;
	this.text.setTransform(31,-67.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Eg8igOwMB5FAAAIAAdhMh5FAAAg");
	this.shape.setTransform(31.525,-6.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#205157").s().p("Eg8iAOxIAA9hMB5FAAAIAAdhg");
	this.shape_1.setTransform(31.525,-6.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-356.9,-101.9,776.9,329.5);


(lib.EOLB1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Karen’s Dying & Spiritual Needs at end of life ", "bold 51px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 63;
	this.text.lineWidth = 702;
	this.text.parent = this;
	this.text.setTransform(31,-67.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Eg8igOwMB5FAAAIAAdhMh5FAAAg");
	this.shape.setTransform(31.525,-6.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#205157").s().p("Eg8iAOxIAA9hMB5FAAAIAAdhg");
	this.shape_1.setTransform(31.525,-6.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-356.9,-101.9,776.9,329.5);


(lib.ContinueButton3 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("CONTINUE", "bold 54px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 67;
	this.text.lineWidth = 443;
	this.text.parent = this;
	this.text.setTransform(6.5,-35.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("A2tI6QiCAAhdh2Qhdh1AAilIAAlTQAAilBdh2QBdh1CCAAMAtaAAAQCDAABcB1QBdB2AAClIAAFdQAACihaBxQhaBziAAAg");
	this.shape.setTransform(2,-2.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-216.9,-59.9,446.9,114);


(lib.ContinueButton2 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("CONTINUE", "bold 54px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 67;
	this.text.lineWidth = 443;
	this.text.parent = this;
	this.text.setTransform(6.5,-35.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("A2tI6QiCAAhdh2Qhdh1AAilIAAlTQAAilBdh2QBdh1CCAAMAtaAAAQCDAABcB1QBdB2AAClIAAFdQAACihaBxQhaBziAAAg");
	this.shape.setTransform(2,-2.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-216.9,-59.9,446.9,114);


(lib.ContinueButton = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("CONTINUE", "bold 54px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 67;
	this.text.lineWidth = 443;
	this.text.parent = this;
	this.text.setTransform(6.5,-35.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("A2tI6QiCAAhdh2Qhdh1AAilIAAlTQAAilBdh2QBdh1CCAAMAtaAAAQCDAABcB1QBdB2AAClIAAFdQAACihaBxQhaBziAAAg");
	this.shape.setTransform(2,-2.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-216.9,-59.9,446.9,114);


(lib.ButtonW = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Written", "bold 40px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 50;
	this.text.lineWidth = 162;
	this.text.parent = this;
	this.text.setTransform(46,-56.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-58.9,166,101.69999999999999);


(lib.ButtonV = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Verbal", "bold 40px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 50;
	this.text.lineWidth = 340;
	this.text.parent = this;
	this.text.setTransform(-43,-44.45);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.9,-46.4,343.9,90.5);


(lib.ButtonP = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Presence", "bold 50px 'Leelawadee'", "#CC6600");
	this.text.textAlign = "center";
	this.text.lineHeight = 62;
	this.text.lineWidth = 263;
	this.text.parent = this;
	this.text.setTransform(143.85,-64.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10.2,-66.2,267.3,113.6);


(lib.ButtonNV = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Non Verbal", "bold 40px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 50;
	this.text.lineWidth = 222;
	this.text.parent = this;
	this.text.setTransform(105.15,-60.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-62.9,226.3,101.69999999999999);


(lib.ButtonF2F = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Face to face", "bold 40px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 50;
	this.text.lineWidth = 315;
	this.text.parent = this;
	this.text.setTransform(58.7,-87.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-100.7,-89.5,318.9,101.7);


(lib.Symbol5 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Tween52("synched",0);
	this.instance.setTransform(-6.35,0.15);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(-167.3,-114.8,334.70000000000005,229.7), null);


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Tween51("synched",0);
	this.instance.setTransform(-32.4,26.55);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(-156.4,-102.4,312.9,204.9), null);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Tween50("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-125.1,-81.9,250.3,163.9), null);


(lib.Symbol2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Tween49("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(-157.2,-102.9,314.5,205.8), null);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Tween48("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(-153.4,-100.4,306.8,200.8), null);


// stage content:
(lib.Scenario3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,390,536,1714,1909,1910,2040,2470,2574,5249,5696,6679,7905];
	this.streamSoundSymbolsList[4] = [{id:"bensoundtomorrow",startFrame:4,endFrame:389,loop:1,offset:0}];
	this.streamSoundSymbolsList[536] = [{id:"bensoundtomorrow",startFrame:536,endFrame:1910,loop:1,offset:22321}];
	this.streamSoundSymbolsList[2040] = [{id:"bensoundtomorrow",startFrame:2040,endFrame:7905,loop:1,offset:85073}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		var _this = this;
		
		_this.StartButton.on('click', function(){
		
		_this.gotoAndPlay(2);
		});
	}
	this.frame_4 = function() {
		var soundInstance = playSound("bensoundtomorrow",0);
		this.InsertIntoSoundStreamData(soundInstance,4,389,1);
	}
	this.frame_390 = function() {
		var _this = this;
		
		_this.ContinueButton.on('click', function(){
		
		_this.gotoAndPlay('537');
		});
		
		_this.stop();
	}
	this.frame_536 = function() {
		var soundInstance = playSound("bensoundtomorrow",0,22321);
		this.InsertIntoSoundStreamData(soundInstance,536,1910,1,22321);
	}
	this.frame_1714 = function() {
		this.stop();
		
		setTimeout(this.play.bind(this), 10000);
	}
	this.frame_1909 = function() {
		this.stop();
		
		var _this = this;
		
		_this.ContinueButton2.on('click', function(){
		
		_this.gotoAndPlay('2041');
		});
		
		this.stop();
		var _this = this;
		
		_this.movieClip_6.visible = false;
		var _this = this;
		
		_this.movieClip_5.visible = false;
		var _this = this;
		
		_this.movieClip_4.visible = false;
		var _this = this;
		
		_this.movieClip_3.visible = false;
		var _this = this;
		
		_this.movieClip_2.visible = false;
		this.ButtonP.addEventListener("click", f5_ClickToShow.bind(this));
		
		function f5_ClickToShow()
		{
			this.movieClip_6.visible = true;
			
		}
		this.ButtonF2F.addEventListener("click", f4_ClickToShow.bind(this));
		
		function f4_ClickToShow()
		{
			this.movieClip_5.visible = true;
			
		}
		this.ButtonW.addEventListener("click", f3_ClickToShow.bind(this));
		
		function f3_ClickToShow()
		{
			this.movieClip_4.visible = true;
			
		}
		this.ButtonNV.addEventListener("click", f2_ClickToShow.bind(this));
		
		function f2_ClickToShow()
		{
			this.movieClip_3.visible = true;
			
		}
		this.ButtonV.addEventListener("click", fl_ClickToShow.bind(this));
		
		function fl_ClickToShow()
		{
			this.movieClip_2.visible = true;
			
		}
	}
	this.frame_1910 = function() {
		this.movieClip_3.addEventListener("click", fl_ClickToShow_2.bind(this));
		
		function fl_ClickToShow_2()
		{
			this.movieClip_3.visible = true;
		}
		
		
		
		this.movieClip_4.addEventListener("click", fl_ClickToShow_3.bind(this));
		
		function fl_ClickToShow_3()
		{
			this.movieClip_4.visible = true;
		}
		
		
		
		this.movieClip_5.addEventListener("click", fl_ClickToShow_4.bind(this));
		
		function fl_ClickToShow_4()
		{
			this.movieClip_5.visible = true;
		}
		
		
		this.movieClip_6.addEventListener("click", fl_ClickToShow_5.bind(this));
		
		function fl_ClickToShow_5()
		{
			this.movieClip_6.visible = true;
		}
	}
	this.frame_2040 = function() {
		var soundInstance = playSound("bensoundtomorrow",0,85073);
		this.InsertIntoSoundStreamData(soundInstance,2040,7905,1,85073);
	}
	this.frame_2470 = function() {
		var _this = this;
		
		_this.EOLB1.on('click', function(){
		
		_this.gotoAndPlay('2576');
		});
	}
	this.frame_2574 = function() {
		var _this = this;
		
		_this.EOLB3.on('click', function(){
		
		_this.gotoAndPlay('5698');
		});
		var _this = this;
		
		_this.EOLB2.on('click', function(){
		
		_this.gotoAndPlay('5251');
		});
		var _this = this;
		
		_this.EOLB1.on('click', function(){
		
		_this.gotoAndPlay('2576');
		});
		
		this.stop();
	}
	this.frame_5249 = function() {
		var _this = this;
		
		_this.gotoAndPlay('2574');
	}
	this.frame_5696 = function() {
		var _this = this;
		
		_this.gotoAndPlay('2574');
	}
	this.frame_6679 = function() {
		var _this = this;
		
		_this.ContinueButton3.on('click', function(){
		
		_this.gotoAndPlay('6681');
		});
		var _this = this;
		
		_this.stop();
	}
	this.frame_7905 = function() {
		var _this = this;
		
		_this.gotoAndPlay('0');
		createjs.Sound.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(386).call(this.frame_390).wait(146).call(this.frame_536).wait(1178).call(this.frame_1714).wait(195).call(this.frame_1909).wait(1).call(this.frame_1910).wait(130).call(this.frame_2040).wait(430).call(this.frame_2470).wait(104).call(this.frame_2574).wait(2675).call(this.frame_5249).wait(447).call(this.frame_5696).wait(983).call(this.frame_6679).wait(1226).call(this.frame_7905).wait(1));

	// Text4
	this.instance = new lib.Tween16("synched",0);
	this.instance.setTransform(750.95,543);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(277).to({_off:false},0).to({alpha:1},13).to({startPosition:0},100).to({_off:true},1).wait(7515));

	// Text3
	this.instance_1 = new lib.Tween15("synched",0);
	this.instance_1.setTransform(783.4,256.25);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(231).to({_off:false},0).to({alpha:1},12).to({startPosition:0},147).to({_off:true},1).wait(7515));

	// Text2
	this.instance_2 = new lib.Tween14("synched",0);
	this.instance_2.setTransform(281.45,186.85);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(185).to({_off:false},0).to({alpha:1},13).to({startPosition:0},192).to({_off:true},1).wait(7515));

	// Text1
	this.instance_3 = new lib.Tween12("synched",0);
	this.instance_3.setTransform(222.1,545.95);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween13("synched",0);
	this.instance_4.setTransform(222.1,545.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},145).to({state:[{t:this.instance_3}]},13).to({state:[{t:this.instance_4}]},232).to({state:[]},1).wait(7515));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(145).to({_off:false},0).to({x:223,alpha:1},13).to({_off:true,x:222.1},232).wait(7516));

	// ContinueButton
	this.instance_5 = new lib.ContinueButton();
	this.instance_5.setTransform(893.35,47.95,0.5,0.5,0,0,0,0.1,0);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;
	new cjs.ButtonHelper(this.instance_5, 0, 1, 1);

	this.ContinueButton = new lib.ContinueButton();
	this.ContinueButton.name = "ContinueButton";
	this.ContinueButton.setTransform(893.35,47.95,0.5,0.5,0,0,0,0.1,0);
	this.ContinueButton._off = true;
	new cjs.ButtonHelper(this.ContinueButton, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(374).to({_off:false},0).to({_off:true,alpha:1},16).wait(7516));
	this.timeline.addTween(cjs.Tween.get(this.ContinueButton).wait(374).to({_off:false},16).wait(145).to({_off:true},1).wait(7370));

	// Text
	this.instance_6 = new lib.Tween7("synched",0);
	this.instance_6.setTransform(499.2,206.9);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween8("synched",0);
	this.instance_7.setTransform(499.2,206.9);
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween9("synched",0);
	this.instance_8.setTransform(499.2,206.9);
	this.instance_8._off = true;

	this.instance_9 = new lib.Tween10("synched",0);
	this.instance_9.setTransform(499.2,206.9);
	this.instance_9.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},43).to({state:[{t:this.instance_7}]},34).to({state:[{t:this.instance_8}]},46).to({state:[{t:this.instance_9}]},22).to({state:[]},1).wait(7760));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(43).to({_off:false},0).to({_off:true,alpha:1},34).wait(7829));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(43).to({_off:false},34).to({_off:true},46).wait(7783));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(77).to({_off:false},46).to({_off:true,alpha:0},22).wait(7761));

	// JaneText4
	this.instance_10 = new lib.Tween24("synched",0);
	this.instance_10.setTransform(531.15,128.2);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1010).to({_off:false},0).to({alpha:1},12).to({startPosition:0},121).to({alpha:0},15).to({_off:true},1).wait(6747));

	// JaneText3
	this.instance_11 = new lib.Tween23("synched",0);
	this.instance_11.setTransform(531.85,143.7);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(866).to({_off:false},0).to({alpha:1},14).to({startPosition:0},130).to({alpha:0},12).to({_off:true},1).wait(6883));

	// JaneText2
	this.instance_12 = new lib.Tween22("synched",0);
	this.instance_12.setTransform(531.85,143.7);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(702).to({_off:false},0).to({alpha:1},15).to({startPosition:0},149).to({alpha:0},14).to({_off:true},1).wait(7025));

	// JaneText1
	this.instance_13 = new lib.Tween20("synched",0);
	this.instance_13.setTransform(526.1,143.75);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(551).to({_off:false},0).to({alpha:1},26).to({startPosition:0},125).to({alpha:0},15).to({_off:true},1).wait(7188));

	// Karen
	this.instance_14 = new lib.Tween3("synched",0);
	this.instance_14.setTransform(529.25,491.1,0.79,0.79);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.instance_15 = new lib.Tween4("synched",0);
	this.instance_15.setTransform(529.25,491.1,0.79,0.79);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1).to({_off:false},0).to({_off:true,alpha:1},48).wait(7857));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1).to({_off:false},48).to({regX:0.1,regY:0.1,x:529.45,y:491.2},486).to({alpha:0},24).to({_off:true},1).wait(7346));

	// SpeechB1
	this.instance_16 = new lib.SpeechB1("synched",0);
	this.instance_16.setTransform(174.2,193,0.66,0.66,0,0,0,28.6,7.6);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1308).to({_off:false},0).to({alpha:1},15).to({startPosition:0},78).to({_off:true},1).wait(6504));

	// Scen2Text1
	this.instance_17 = new lib.Tween28("synched",0);
	this.instance_17.setTransform(505.95,84.8);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1197).to({_off:false},0).to({alpha:1},16).to({startPosition:0},95).to({alpha:0},15).to({_off:true},1).wait(6582));

	// Nurse2
	this.instance_18 = new lib.Tween29("synched",0);
	this.instance_18.setTransform(376.9,461.8);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1308).to({_off:false},0).to({alpha:1},1).to({startPosition:0},92).to({alpha:0},16).to({_off:true},1).wait(6488));

	// Nurse1
	this.instance_19 = new lib.Tween27("synched",0);
	this.instance_19.setTransform(336.6,461.8);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1158).to({_off:false},0).to({alpha:1},24).to({startPosition:0},126).to({alpha:0},1).to({_off:true},1).wait(6596));

	// Jane
	this.instance_20 = new lib.Tween17("synched",0);
	this.instance_20.setTransform(518,459.8);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(535).to({_off:false},0).to({alpha:1},24).to({startPosition:0},842).to({alpha:0},16).to({_off:true},1).wait(6488));

	// TextAppearing1
	this.instance_21 = new lib.Tween31("synched",0);
	this.instance_21.setTransform(528.4,73.6);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.instance_22 = new lib.Tween32("synched",0);
	this.instance_22.setTransform(528.4,73.6);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1427).to({_off:false},0).to({_off:true,alpha:1},17).wait(6462));
	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1427).to({_off:false},17).to({startPosition:0},270).to({alpha:0},16).to({_off:true},1).wait(6175));

	// TextA5
	this.instance_23 = new lib.Tween42("synched",0);
	this.instance_23.setTransform(161.55,557.5);
	this.instance_23.alpha = 0;
	this.instance_23._off = true;

	this.instance_24 = new lib.Tween43("synched",0);
	this.instance_24.setTransform(161.55,557.5);
	this.instance_24.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_23}]},1618).to({state:[{t:this.instance_23}]},19).to({state:[{t:this.instance_23}]},77).to({state:[{t:this.instance_24}]},16).to({state:[]},1).wait(6175));
	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1618).to({_off:false},0).to({alpha:1},19).to({startPosition:0},77).to({_off:true,alpha:0},16).wait(6176));

	// TextA4
	this.instance_25 = new lib.Tween39("synched",0);
	this.instance_25.setTransform(178.9,477.4);
	this.instance_25.alpha = 0;
	this.instance_25._off = true;

	this.instance_26 = new lib.Tween40("synched",0);
	this.instance_26.setTransform(178.9,477.4);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1587).to({_off:false},0).to({_off:true,alpha:1},20).wait(6299));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1587).to({_off:false},20).to({startPosition:0},107).to({alpha:0},16).to({_off:true},1).wait(6175));

	// TextA3
	this.instance_27 = new lib.Tween37("synched",0);
	this.instance_27.setTransform(210.85,370.7);
	this.instance_27.alpha = 0;
	this.instance_27._off = true;

	this.instance_28 = new lib.Tween38("synched",0);
	this.instance_28.setTransform(210.85,370.7);
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1558).to({_off:false},0).to({_off:true,alpha:1},20).wait(6328));
	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1558).to({_off:false},20).to({startPosition:0},136).to({alpha:0},16).to({_off:true},1).wait(6175));

	// TextA2
	this.instance_29 = new lib.Tween35("synched",0);
	this.instance_29.setTransform(228.55,288.95);
	this.instance_29.alpha = 0;
	this.instance_29._off = true;

	this.instance_30 = new lib.Tween36("synched",0);
	this.instance_30.setTransform(228.55,288.95);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1525).to({_off:false},0).to({_off:true,alpha:1},20).wait(6361));
	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1525).to({_off:false},20).to({startPosition:0},169).to({alpha:0},16).to({_off:true},1).wait(6175));

	// TextA1
	this.instance_31 = new lib.Tween33("synched",0);
	this.instance_31.setTransform(223.7,223.15);
	this.instance_31.alpha = 0;
	this.instance_31._off = true;

	this.instance_32 = new lib.Tween34("synched",0);
	this.instance_32.setTransform(223.7,223.15);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(1490).to({_off:false},0).to({_off:true,alpha:1},20).wait(6396));
	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(1490).to({_off:false},20).to({startPosition:0},204).to({alpha:0},16).to({_off:true},1).wait(6175));

	// ContinueB2
	this.ContinueButton2 = new lib.ContinueButton2();
	this.ContinueButton2.name = "ContinueButton2";
	this.ContinueButton2.setTransform(918.2,715.65,0.46,0.46,0,0,0,0,0.1);
	this.ContinueButton2.alpha = 0;
	this.ContinueButton2._off = true;
	new cjs.ButtonHelper(this.ContinueButton2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.ContinueButton2).wait(1888).to({_off:false},0).to({alpha:1},21).to({_off:true},1).wait(5996));

	// PresenceImg
	this.movieClip_6 = new lib.Symbol5();
	this.movieClip_6.name = "movieClip_6";
	this.movieClip_6.setTransform(559.55,240.75);
	this.movieClip_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_6).wait(1909).to({_off:false},0).to({_off:true},1).wait(5996));

	// FacetoFaceImg
	this.movieClip_5 = new lib.Symbol4();
	this.movieClip_5.name = "movieClip_5";
	this.movieClip_5.setTransform(874.55,316.4);
	this.movieClip_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_5).wait(1909).to({_off:false},0).to({_off:true},1).wait(5996));

	// WrittenImg
	this.movieClip_4 = new lib.Symbol3();
	this.movieClip_4.name = "movieClip_4";
	this.movieClip_4.setTransform(230.15,338.95);
	this.movieClip_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_4).wait(1909).to({_off:false},0).to({_off:true},1).wait(5996));

	// NonverbalImg
	this.movieClip_3 = new lib.Symbol2();
	this.movieClip_3.name = "movieClip_3";
	this.movieClip_3.setTransform(867.2,496.9);
	this.movieClip_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_3).wait(1909).to({_off:false},0).to({_off:true},1).wait(5996));

	// VerbalImg
	this.movieClip_2 = new lib.Symbol1();
	this.movieClip_2.name = "movieClip_2";
	this.movieClip_2.setTransform(159.4,505.4);
	this.movieClip_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_2).wait(1909).to({_off:false},0).to({_off:true},1).wait(5996));

	// ButtonP
	this.ButtonP = new lib.ButtonP();
	this.ButtonP.name = "ButtonP";
	this.ButtonP.setTransform(407.55,267);
	this.ButtonP.alpha = 0;
	this.ButtonP._off = true;
	new cjs.ButtonHelper(this.ButtonP, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.ButtonP).wait(1861).to({_off:false},0).to({alpha:1},16).wait(162).to({_off:true},1).wait(5866));

	// ButtonF2F
	this.ButtonF2F = new lib.ButtonF2F();
	this.ButtonF2F.name = "ButtonF2F";
	this.ButtonF2F.setTransform(798.45,371.35);
	this.ButtonF2F.alpha = 0;
	this.ButtonF2F._off = true;
	new cjs.ButtonHelper(this.ButtonF2F, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.ButtonF2F).wait(1829).to({_off:false},0).to({alpha:1},18).wait(192).to({_off:true},1).wait(5866));

	// ButtonW
	this.ButtonW = new lib.ButtonW();
	this.ButtonW.name = "ButtonW";
	this.ButtonW.setTransform(204.05,373.3);
	this.ButtonW.alpha = 0;
	this.ButtonW._off = true;
	new cjs.ButtonHelper(this.ButtonW, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.ButtonW).wait(1799).to({_off:false},0).to({alpha:1},15).wait(225).to({_off:true},1).wait(5866));

	// ButtonNV
	this.ButtonNV = new lib.ButtonNV();
	this.ButtonNV.name = "ButtonNV";
	this.ButtonNV.setTransform(759.45,518.7);
	this.ButtonNV.alpha = 0;
	this.ButtonNV._off = true;
	new cjs.ButtonHelper(this.ButtonNV, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.ButtonNV).wait(1769).to({_off:false},0).to({alpha:1},16).wait(254).to({_off:true},1).wait(5866));

	// ButtonV
	this.ButtonV = new lib.ButtonV();
	this.ButtonV.name = "ButtonV";
	this.ButtonV.setTransform(205.55,505.45);
	this.ButtonV.alpha = 0;
	this.ButtonV._off = true;
	new cjs.ButtonHelper(this.ButtonV, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.ButtonV).wait(1740).to({_off:false},0).to({alpha:1},18).wait(281).to({_off:true},1).wait(5866));

	// TextAP1
	this.instance_33 = new lib.Tween44("synched",0);
	this.instance_33.setTransform(527.85,121.35);
	this.instance_33.alpha = 0;
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(1714).to({_off:false},0).to({alpha:1},16).to({startPosition:0},147).to({startPosition:0},32).to({startPosition:0},130).to({alpha:0},23).to({_off:true},1).wait(5843));

	// EndOfLifeCButton
	this.ContinueButton3 = new lib.ContinueButton3();
	this.ContinueButton3.name = "ContinueButton3";
	this.ContinueButton3.setTransform(922.85,672.7,0.44,0.44,0,0,0,0.1,0);
	this.ContinueButton3._off = true;
	new cjs.ButtonHelper(this.ContinueButton3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.ContinueButton3).wait(6654).to({_off:false},0).wait(25).to({_off:true},1).wait(1226));

	// LastOfficesImg2
	this.instance_34 = new lib.Tween111("synched",0);
	this.instance_34.setTransform(512,384);
	this.instance_34.alpha = 0;
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(6644).to({_off:false},0).to({alpha:1},35).to({_off:true},1).wait(1226));

	// LastOffices1
	this.instance_35 = new lib.Tween108("synched",0);
	this.instance_35.setTransform(532.4,96.5,1.5,1.5);
	this.instance_35.alpha = 0;
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(6235).to({_off:false},0).to({alpha:1},39).to({startPosition:0},370).to({alpha:0},35).to({_off:true},1).wait(1226));

	// LastOfficesImg1
	this.instance_36 = new lib.Tween109("synched",0);
	this.instance_36.setTransform(512,384);
	this.instance_36.alpha = 0;
	this.instance_36._off = true;

	this.instance_37 = new lib.Tween110("synched",0);
	this.instance_37.setTransform(512,384);
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(6235).to({_off:false},0).to({_off:true,alpha:1},39).wait(1632));
	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(6235).to({_off:false},39).to({startPosition:0},370).to({alpha:0},35).to({_off:true},1).wait(1226));

	// eol205
	this.instance_38 = new lib.Tween90("synched",0);
	this.instance_38.setTransform(339.35,181.35);
	this.instance_38.alpha = 0;
	this.instance_38._off = true;

	this.instance_39 = new lib.Tween91("synched",0);
	this.instance_39.setTransform(339.35,181.35);
	this.instance_39._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(5545).to({_off:false},0).to({_off:true,alpha:1},14).wait(2347));
	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(5545).to({_off:false},14).to({startPosition:0},125).to({alpha:0},12).to({_off:true},1).wait(2209));

	// eol204
	this.instance_40 = new lib.Tween92("synched",0);
	this.instance_40.setTransform(311.4,160.35);
	this.instance_40.alpha = 0;
	this.instance_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(5468).to({_off:false},0).to({alpha:1},14).to({startPosition:0},63).to({alpha:0},14).to({_off:true},1).wait(2346));

	// eol203
	this.instance_41 = new lib.Tween94("synched",0);
	this.instance_41.setTransform(356.1,162.95);
	this.instance_41.alpha = 0;
	this.instance_41._off = true;

	this.instance_42 = new lib.Tween95("synched",0);
	this.instance_42.setTransform(356.1,162.95);
	this.instance_42._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(5383).to({_off:false},0).to({_off:true,alpha:1},14).wait(2509));
	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(5383).to({_off:false},14).to({startPosition:0},71).to({alpha:0},14).to({_off:true},1).wait(2423));

	// eol202
	this.instance_43 = new lib.Tween96("synched",0);
	this.instance_43.setTransform(408.6,223.35);
	this.instance_43.alpha = 0;
	this.instance_43._off = true;

	this.instance_44 = new lib.Tween97("synched",0);
	this.instance_44.setTransform(408.6,223.35);
	this.instance_44._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(5279).to({_off:false},0).to({_off:true,alpha:1},14).wait(2613));
	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(5279).to({_off:false},14).to({startPosition:0},90).to({alpha:0},14).to({_off:true},1).wait(2508));

	// eol201
	this.instance_45 = new lib.Tween98("synched",0);
	this.instance_45.setTransform(517.45,86.5);
	this.instance_45.alpha = 0;
	this.instance_45._off = true;

	this.instance_46 = new lib.Tween99("synched",0);
	this.instance_46.setTransform(517.45,86.5);
	this.instance_46._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(5250).to({_off:false},0).to({_off:true,alpha:1},14).wait(2642));
	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(5250).to({_off:false},14).to({startPosition:0},420).to({alpha:0},12).to({_off:true},1).wait(2209));

	// Texteol24
	this.instance_47 = new lib.Tween88("synched",0);
	this.instance_47.setTransform(346.4,181.4);
	this.instance_47.alpha = 0;
	this.instance_47._off = true;

	this.instance_48 = new lib.Tween89("synched",0);
	this.instance_48.setTransform(346.4,181.4);
	this.instance_48._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(5099).to({_off:false},0).to({_off:true,alpha:1},14).wait(2793));
	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(5099).to({_off:false},14).to({startPosition:0},122).to({alpha:0},14).to({_off:true},1).wait(2656));

	// Texteol23
	this.instance_49 = new lib.Tween86("synched",0);
	this.instance_49.setTransform(377.9,189.1);
	this.instance_49.alpha = 0;
	this.instance_49._off = true;

	this.instance_50 = new lib.Tween87("synched",0);
	this.instance_50.setTransform(377.9,189.1);
	this.instance_50._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(4952).to({_off:false},0).to({_off:true,alpha:1},14).wait(2940));
	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(4952).to({_off:false},14).to({startPosition:0},133).to({alpha:0},14).to({_off:true},1).wait(2792));

	// Texteol22
	this.instance_51 = new lib.Tween84("synched",0);
	this.instance_51.setTransform(393.7,190.8);
	this.instance_51.alpha = 0;
	this.instance_51._off = true;

	this.instance_52 = new lib.Tween85("synched",0);
	this.instance_52.setTransform(393.7,190.8);
	this.instance_52._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(4784).to({_off:false},0).to({_off:true,alpha:1},14).wait(3108));
	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(4784).to({_off:false},14).to({startPosition:0},154).to({alpha:0},14).to({_off:true},1).wait(2939));

	// Texteol21
	this.instance_53 = new lib.Tween82("synched",0);
	this.instance_53.setTransform(392.8,190.85);
	this.instance_53.alpha = 0;
	this.instance_53._off = true;

	this.instance_54 = new lib.Tween83("synched",0);
	this.instance_54.setTransform(392.8,190.85);
	this.instance_54._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(4654).to({_off:false},0).to({_off:true,alpha:1},14).wait(3238));
	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(4654).to({_off:false},14).to({startPosition:0},116).to({alpha:0},14).to({_off:true},1).wait(3107));

	// Texteol20
	this.instance_55 = new lib.Tween81("synched",0);
	this.instance_55.setTransform(515.7,93.75);
	this.instance_55.alpha = 0;
	this.instance_55._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(4619).to({_off:false},0).to({alpha:1},14).to({startPosition:0},602).to({alpha:0},14).to({_off:true},1).wait(2656));

	// Texteol19
	this.instance_56 = new lib.Tween79("synched",0);
	this.instance_56.setTransform(371.9,162.2);
	this.instance_56.alpha = 0;
	this.instance_56._off = true;

	this.instance_57 = new lib.Tween80("synched",0);
	this.instance_57.setTransform(371.9,162.2);
	this.instance_57.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_56}]},4433).to({state:[{t:this.instance_56}]},17).to({state:[{t:this.instance_56}]},133).to({state:[{t:this.instance_57}]},17).to({state:[]},1).wait(3305));
	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(4433).to({_off:false},0).to({alpha:1},17).to({startPosition:0},133).to({_off:true,alpha:0},17).wait(3306));

	// Texteol18
	this.instance_58 = new lib.Tween78("synched",0);
	this.instance_58.setTransform(505.2,102.55);
	this.instance_58.alpha = 0;
	this.instance_58._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(4399).to({_off:false},0).to({alpha:1},16).to({startPosition:0},168).to({alpha:0},17).to({_off:true},1).wait(3305));

	// Texteol17
	this.instance_59 = new lib.Tween76("synched",0);
	this.instance_59.setTransform(354.35,157.55);
	this.instance_59.alpha = 0;
	this.instance_59._off = true;

	this.instance_60 = new lib.Tween77("synched",0);
	this.instance_60.setTransform(354.35,157.55);
	this.instance_60._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(4264).to({_off:false},0).to({_off:true,alpha:1},14).wait(3628));
	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(4264).to({_off:false},14).to({startPosition:0},86).to({alpha:0},15).to({_off:true},1).wait(3526));

	// Texteol16
	this.instance_61 = new lib.Tween74("synched",0);
	this.instance_61.setTransform(341.2,154.2);
	this.instance_61.alpha = 0;
	this.instance_61._off = true;

	this.instance_62 = new lib.Tween75("synched",0);
	this.instance_62.setTransform(341.2,154.2);
	this.instance_62._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(4124).to({_off:false},0).to({_off:true,alpha:1},14).wait(3768));
	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(4124).to({_off:false},14).to({startPosition:0},126).to({alpha:0},14).to({_off:true},1).wait(3627));

	// Texteol15
	this.instance_63 = new lib.Tween72("synched",0);
	this.instance_63.setTransform(362.1,159.6);
	this.instance_63.alpha = 0;
	this.instance_63._off = true;

	this.instance_64 = new lib.Tween73("synched",0);
	this.instance_64.setTransform(362.1,159.6);
	this.instance_64._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(4017).to({_off:false},0).to({_off:true,alpha:1},14).wait(3875));
	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(4017).to({_off:false},14).to({startPosition:0},93).to({alpha:0},14).to({_off:true},1).wait(3767));

	// Texteol14
	this.instance_65 = new lib.Tween70("synched",0);
	this.instance_65.setTransform(378,148.15);
	this.instance_65.alpha = 0;
	this.instance_65._off = true;

	this.instance_66 = new lib.Tween71("synched",0);
	this.instance_66.setTransform(378,148.15);
	this.instance_66._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(3921).to({_off:false},0).to({_off:true,alpha:1},16).wait(3969));
	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(3921).to({_off:false},16).to({startPosition:0},80).to({alpha:0},14).to({_off:true},69).wait(3806));

	// Texteol13
	this.instance_67 = new lib.Tween68("synched",0);
	this.instance_67.setTransform(425.25,157.55);
	this.instance_67.alpha = 0;
	this.instance_67._off = true;

	this.instance_68 = new lib.Tween69("synched",0);
	this.instance_68.setTransform(425.25,157.55);
	this.instance_68._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(3763).to({_off:false},0).to({_off:true,alpha:1},14).wait(4129));
	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(3763).to({_off:false},14).to({startPosition:0},144).to({alpha:0},16).to({_off:true},1).wait(3968));

	// Texteol12
	this.instance_69 = new lib.Tween67("synched",0);
	this.instance_69.setTransform(508.7,24.35);
	this.instance_69.alpha = 0;
	this.instance_69._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(3724).to({_off:false},0).to({alpha:1},17).to({startPosition:0},623).to({alpha:0},15).to({_off:true},1).wait(3526));

	// Texteol11
	this.instance_70 = new lib.Tween66("synched",0);
	this.instance_70.setTransform(332.4,198.15);
	this.instance_70.alpha = 0;
	this.instance_70._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(3603).to({_off:false},0).to({alpha:1},18).to({startPosition:0},70).to({alpha:0},18).to({_off:true},1).wait(4196));

	// Texteol10
	this.instance_71 = new lib.Tween65("synched",0);
	this.instance_71.setTransform(331.4,189.15);
	this.instance_71.alpha = 0;
	this.instance_71._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(3474).to({_off:false},0).to({alpha:1},19).to({startPosition:0},110).to({alpha:0},18).to({_off:true},1).wait(4284));

	// Texteol9
	this.instance_72 = new lib.Tween64("synched",0);
	this.instance_72.setTransform(513.95,75.35);
	this.instance_72.alpha = 0;
	this.instance_72._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_72).wait(3419).to({_off:false},0).to({alpha:1},17).to({startPosition:0},255).to({alpha:0},18).to({_off:true},1).wait(4196));

	// Texteol8
	this.instance_73 = new lib.Tween63("synched",0);
	this.instance_73.setTransform(356.8,174.45);
	this.instance_73.alpha = 0;
	this.instance_73._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_73).wait(3303).to({_off:false},0).to({x:358.55,alpha:1},18).to({startPosition:0},70).to({alpha:0},17).to({_off:true},1).wait(4497));

	// Texteol7
	this.instance_74 = new lib.Tween62("synched",0);
	this.instance_74.setTransform(342.8,169);
	this.instance_74.alpha = 0;
	this.instance_74._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_74).wait(3169).to({_off:false},0).to({alpha:1},20).to({startPosition:0},114).to({alpha:0},17).to({_off:true},1).wait(4585));

	// Texteol6
	this.instance_75 = new lib.Tween61("synched",0);
	this.instance_75.setTransform(519.2,77.1);
	this.instance_75.alpha = 0;
	this.instance_75._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_75).wait(3106).to({_off:false},0).to({alpha:1},17).to({startPosition:0},268).to({alpha:0},17).to({_off:true},1).wait(4497));

	// Texteol5
	this.instance_76 = new lib.Tween60("synched",0);
	this.instance_76.setTransform(314.7,163.05);
	this.instance_76.alpha = 0;
	this.instance_76._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_76).wait(2990).to({_off:false},0).to({alpha:1},17).to({startPosition:0},70).to({alpha:0},17).to({_off:true},1).wait(4811));

	// Texteol4
	this.instance_77 = new lib.Tween59("synched",0);
	this.instance_77.setTransform(240.45,153.35);
	this.instance_77.alpha = 0;
	this.instance_77._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_77).wait(2864).to({_off:false},0).to({alpha:1},17).to({startPosition:0},109).to({alpha:0},17).to({_off:true},1).wait(4898));

	// Texteol3
	this.instance_78 = new lib.Tween57("synched",0);
	this.instance_78.setTransform(514.85,114.55);
	this.instance_78.alpha = 0;
	this.instance_78._off = true;

	this.instance_79 = new lib.Tween58("synched",0);
	this.instance_79.setTransform(514.85,114.55);
	this.instance_79._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(2829).to({_off:false},0).to({_off:true,alpha:1},18).wait(5059));
	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(2829).to({_off:false},18).to({startPosition:0},230).to({alpha:0},17).to({_off:true},1).wait(4811));

	// Texteol2
	this.instance_80 = new lib.Tween56("synched",0);
	this.instance_80.setTransform(506.9,103.15);
	this.instance_80.alpha = 0;
	this.instance_80._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_80).wait(2689).to({_off:false},0).to({alpha:1},18).to({startPosition:0},122).to({alpha:0},18).to({_off:true},1).wait(5058));

	// Texteol1
	this.instance_81 = new lib.Tween55("synched",0);
	this.instance_81.setTransform(518.15,77.5);
	this.instance_81.alpha = 0;
	this.instance_81._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(2575).to({_off:false},0).to({alpha:1},19).to({startPosition:0},95).to({alpha:0},18).to({_off:true},1).wait(5198));

	// EOLB3
	this.EOLB3 = new lib.EOLB3();
	this.EOLB3.name = "EOLB3";
	this.EOLB3.setTransform(840.95,155.85,0.35,0.35,0,0,0,0.1,0);
	this.EOLB3.alpha = 0;
	this.EOLB3._off = true;
	new cjs.ButtonHelper(this.EOLB3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.EOLB3).wait(2517).to({_off:false},0).to({alpha:1},24).wait(33).to({_off:true},1).wait(5331));

	// EOLB2
	this.EOLB2 = new lib.EOLB2();
	this.EOLB2.name = "EOLB2";
	this.EOLB2.setTransform(509.05,155.85,0.35,0.35);
	this.EOLB2.alpha = 0;
	this.EOLB2._off = true;
	new cjs.ButtonHelper(this.EOLB2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.EOLB2).wait(2481).to({_off:false},0).to({alpha:1},29).wait(64).to({_off:true},1).wait(5331));

	// EOLB1
	this.EOLB1 = new lib.EOLB1();
	this.EOLB1.name = "EOLB1";
	this.EOLB1.setTransform(177.1,155.9,0.35,0.35,0,0,0,0.3,0.1);
	this.EOLB1.alpha = 0;
	this.EOLB1._off = true;
	new cjs.ButtonHelper(this.EOLB1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.EOLB1).wait(2445).to({_off:false},0).to({alpha:1},25).wait(104).to({_off:true},1).wait(5331));

	// Title1
	this.instance_82 = new lib.Tween53("synched",0);
	this.instance_82.setTransform(516,90.75);
	this.instance_82.alpha = 0;
	this.instance_82._off = true;

	this.instance_83 = new lib.Tween54("synched",0);
	this.instance_83.setTransform(516,90.75);
	this.instance_83._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_82).wait(2403).to({_off:false},0).to({_off:true,alpha:1},42).wait(5461));
	this.timeline.addTween(cjs.Tween.get(this.instance_83).wait(2403).to({_off:false},42).to({startPosition:0},129).to({_off:true},1).wait(5331));

	// SpeechB2
	this.instance_84 = new lib.SpeechB3("synched",0);
	this.instance_84.setTransform(585.2,223.45,0.82,0.82,0,0,0,30.7,7.6);
	this.instance_84.alpha = 0;
	this.instance_84._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(2249).to({_off:false},0).to({alpha:1},33).to({startPosition:0},95).to({alpha:0},26).to({_off:true},1).wait(5502));

	// SpeechB1
	this.instance_85 = new lib.SpeechB2("synched",0);
	this.instance_85.setTransform(585.2,223.45,0.73,0.73,0,0,0,28.3,7.5);
	this.instance_85.alpha = 0;
	this.instance_85._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_85).wait(2054).to({_off:false},0).to({alpha:1},41).to({startPosition:0},154).to({alpha:0},33).to({_off:true},1).wait(5623));

	// JaneTex03
	this.instance_86 = new lib.Tween115("synched",0);
	this.instance_86.setTransform(516.95,157.25);
	this.instance_86.alpha = 0;
	this.instance_86._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_86).wait(7089).to({_off:false},0).to({alpha:1},27).to({startPosition:0},229).to({alpha:0},24).to({_off:true},1).wait(536));

	// JaneText02
	this.instance_87 = new lib.Tween114("synched",0);
	this.instance_87.setTransform(517.8,144);
	this.instance_87.alpha = 0;
	this.instance_87._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_87).wait(6885).to({_off:false},0).to({alpha:1},27).to({startPosition:0},177).to({alpha:0},27).to({_off:true},1).wait(789));

	// JaneText01
	this.instance_88 = new lib.Tween113("synched",0);
	this.instance_88.setTransform(519.15,153.55);
	this.instance_88.alpha = 0;
	this.instance_88._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_88).wait(6726).to({_off:false},0).to({alpha:1},27).to({startPosition:0},132).to({alpha:0},27).to({_off:true},1).wait(993));

	// JaneNurse
	this.instance_89 = new lib.Tween112("synched",0);
	this.instance_89.setTransform(514,462.4);
	this.instance_89.alpha = 0;
	this.instance_89._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_89).wait(6680).to({_off:false},0).to({alpha:1},27).to({startPosition:0},638).to({alpha:0},24).to({_off:true},1).wait(536));

	// DoorSign
	this.instance_90 = new lib.Tween121("synched",0);
	this.instance_90.setTransform(855.95,290.2);
	this.instance_90.alpha = 0;
	this.instance_90._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_90).wait(7746).to({_off:false},0).to({alpha:1},20).to({startPosition:0},139).wait(1));

	// Jane
	this.instance_91 = new lib.Tween120("synched",0);
	this.instance_91.setTransform(111.85,430.55);
	this.instance_91.alpha = 0;
	this.instance_91._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_91).wait(7746).to({_off:false},0).to({alpha:1},20).to({startPosition:0},139).wait(1));

	// Family
	this.instance_92 = new lib.Tween119("synched",0);
	this.instance_92.setTransform(426,471.75);
	this.instance_92.alpha = 0;
	this.instance_92._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_92).wait(7746).to({_off:false},0).to({alpha:1},20).to({startPosition:0},139).wait(1));

	// HBSpeech1
	this.instance_93 = new lib.SpeechB4("synched",0);
	this.instance_93.setTransform(324.45,138.75,1,1,0,0,0,34.5,19.9);
	this.instance_93.alpha = 0;
	this.instance_93._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_93).wait(7420).to({_off:false},0).to({alpha:1},18).to({startPosition:0},64).to({alpha:0},17).to({_off:true},1).wait(386));

	// HBSpeech2
	this.instance_94 = new lib.SpeechB5("synched",0);
	this.instance_94.setTransform(324.45,138.75,1,1,0,0,0,34.5,19.9);
	this.instance_94.alpha = 0;
	this.instance_94._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_94).wait(7502).to({_off:false},0).to({alpha:1},17).to({startPosition:0},95).to({alpha:0},16).to({_off:true},1).wait(275));

	// HBSpeech3
	this.instance_95 = new lib.SpeechB6("synched",0);
	this.instance_95.setTransform(412.15,281.55,0.77,0.77,0,0,0,34.5,19.9);
	this.instance_95.alpha = 0;
	this.instance_95._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_95).wait(7651).to({_off:false},0).to({alpha:1},14).to({startPosition:0},81).to({alpha:0},20).to({_off:true},1).wait(139));

	// HairBrush2
	this.instance_96 = new lib.Tween118("synched",0);
	this.instance_96.setTransform(338.4,458.4);
	this.instance_96.alpha = 0;
	this.instance_96._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_96).wait(7411).to({_off:false},0).to({alpha:1},1).to({startPosition:0},334).to({alpha:0},20).to({_off:true},1).wait(139));

	// HairBrush1
	this.instance_97 = new lib.Tween116("synched",0);
	this.instance_97.setTransform(338.4,462.5);
	this.instance_97.alpha = 0;
	this.instance_97._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_97).wait(7345).to({_off:false},0).to({alpha:1},24).to({startPosition:0},42).to({alpha:0},1).to({_off:true},1).wait(493));

	// Scen4Background
	this.instance_98 = new lib.Tween117("synched",0);
	this.instance_98.setTransform(513.35,387);
	this.instance_98.alpha = 0;
	this.instance_98._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_98).wait(7345).to({_off:false},0).to({alpha:1},24).to({startPosition:0},536).wait(1));

	// Texteol304
	this.instance_99 = new lib.Tween106("synched",0);
	this.instance_99.setTransform(403.35,238.25);
	this.instance_99.alpha = 0;
	this.instance_99._off = true;

	this.instance_100 = new lib.Tween107("synched",0);
	this.instance_100.setTransform(403.35,238.25);
	this.instance_100._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_99).wait(6015).to({_off:false},0).to({_off:true,alpha:1},16).wait(1875));
	this.timeline.addTween(cjs.Tween.get(this.instance_100).wait(6015).to({_off:false},16).to({startPosition:0},204).to({alpha:0},39).to({_off:true},1).wait(1631));

	// Texteol303
	this.instance_101 = new lib.Tween104("synched",0);
	this.instance_101.setTransform(404.3,211.1);
	this.instance_101.alpha = 0;
	this.instance_101._off = true;

	this.instance_102 = new lib.Tween105("synched",0);
	this.instance_102.setTransform(404.3,211.1);
	this.instance_102._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_101).wait(5831).to({_off:false},0).to({_off:true,alpha:1},16).wait(2059));
	this.timeline.addTween(cjs.Tween.get(this.instance_102).wait(5831).to({_off:false},16).to({startPosition:0},168).to({alpha:0},16).to({_off:true},1).wait(1874));

	// Texteol302
	this.instance_103 = new lib.Tween102("synched",0);
	this.instance_103.setTransform(378.75,217.2);
	this.instance_103.alpha = 0;
	this.instance_103._off = true;

	this.instance_104 = new lib.Tween103("synched",0);
	this.instance_104.setTransform(378.75,217.2);
	this.instance_104._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_103).wait(5728).to({_off:false},0).to({_off:true,alpha:1},16).wait(2162));
	this.timeline.addTween(cjs.Tween.get(this.instance_104).wait(5728).to({_off:false},16).to({startPosition:0},87).to({alpha:0},16).to({_off:true},1).wait(2058));

	// Texteol301
	this.instance_105 = new lib.Tween100("synched",0);
	this.instance_105.setTransform(532.4,63.8);
	this.instance_105.alpha = 0;
	this.instance_105._off = true;

	this.instance_106 = new lib.Tween101("synched",0);
	this.instance_106.setTransform(532.4,63.8);
	this.instance_106._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_105).wait(5697).to({_off:false},0).to({_off:true,alpha:1},16).wait(2193));
	this.timeline.addTween(cjs.Tween.get(this.instance_106).wait(5697).to({_off:false},16).to({startPosition:0},522).to({alpha:0},39).to({_off:true},1).wait(1631));

	// JaneSitting
	this.instance_107 = new lib.Tween45("synched",0);
	this.instance_107.setTransform(673.8,504.15);
	this.instance_107.alpha = 0;
	this.instance_107._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_107).wait(1401).to({_off:false},0).to({y:504.05,alpha:1},16).to({startPosition:0},4818).to({alpha:0},39).to({_off:true},1).wait(1631));

	// NurseSitting
	this.instance_108 = new lib.Tween47("synched",0);
	this.instance_108.setTransform(411.7,499.85);
	this.instance_108.alpha = 0;
	this.instance_108._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_108).wait(1401).to({_off:false},0).to({y:499.75,alpha:1},16).to({startPosition:0},4818).to({alpha:0},39).to({_off:true},1).wait(1631));

	// Background1
	this.instance_109 = new lib.Tween25("synched",0);
	this.instance_109.setTransform(505.5,388);
	this.instance_109.alpha = 0;
	this.instance_109._off = true;

	this.instance_110 = new lib.Tween26("synched",0);
	this.instance_110.setTransform(505.5,388);
	this.instance_110._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_109).wait(1158).to({_off:false},0).to({alpha:1},24).to({_off:true},219).wait(6505));
	this.timeline.addTween(cjs.Tween.get(this.instance_110).wait(1182).to({_off:false},219).to({alpha:0},16).to({_off:true},1).wait(6488));

	// Background2
	this.instance_111 = new lib.Tween30("synched",0);
	this.instance_111.setTransform(515,381);
	this.instance_111.alpha = 0;
	this.instance_111._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_111).wait(1401).to({_off:false},0).to({alpha:1},16).to({startPosition:0},297).to({startPosition:0},4521).to({alpha:0},39).to({_off:true},1).wait(1631));

	// StartButton
	this.StartButton = new lib.StartButton();
	this.StartButton.name = "StartButton";
	this.StartButton.setTransform(506,625.2,0.68,0.68);
	new cjs.ButtonHelper(this.StartButton, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.StartButton).to({_off:true},1).wait(7905));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(502.4,378,535.6,396);
// library properties:
lib.properties = {
	id: '4E44B12FAC114A45B34D48500D701DA9',
	width: 1024,
	height: 768,
	fps: 24,
	color: "#68CAD7",
	opacity: 1.00,
	manifest: [
		{src:"images/Scenario3_atlas_1.png", id:"Scenario3_atlas_1"},
		{src:"images/Scenario3_atlas_2.png", id:"Scenario3_atlas_2"},
		{src:"images/Scenario3_atlas_3.png", id:"Scenario3_atlas_3"},
		{src:"images/Scenario3_atlas_4.png", id:"Scenario3_atlas_4"},
		{src:"images/Scenario3_atlas_5.png", id:"Scenario3_atlas_5"},
		{src:"sounds/bensoundtomorrow.mp3", id:"bensoundtomorrow"}
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
an.compositions['4E44B12FAC114A45B34D48500D701DA9'] = {
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