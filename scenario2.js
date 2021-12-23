(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"scenario2_atlas_1", frames: [[0,0,1046,774],[0,776,1027,768],[0,1546,455,455],[457,1546,455,455],[1048,586,455,455],[1787,1043,163,608],[1029,1043,377,490],[1408,1043,377,490],[1505,586,455,455],[1048,0,964,584],[1281,1535,237,398],[1520,1653,347,249],[914,1546,365,282]]},
		{name:"scenario2_atlas_2", frames: [[362,386,369,195],[175,0,172,490],[0,0,173,490],[349,0,206,384],[0,492,360,221]]}
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
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Background2 = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Diagram = function() {
	this.initialize(ss["scenario2_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.graphpysch = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.graphsocial = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.graphspirit = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Nurse1 = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.nurse_brian = function() {
	this.initialize(ss["scenario2_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.nurse_brian_ppe = function() {
	this.initialize(ss["scenario2_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Nurse_Brian_Sitting_PPE = function() {
	this.initialize(ss["scenario2_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.nurse_comforting = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.nurse_comforting_1 = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.painGraph = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.paingraph2 = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Patientsitting = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.Speechbubble = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.think_bubble = function() {
	this.initialize(ss["scenario2_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.who = function() {
	this.initialize(ss["scenario2_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Tween139 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.graphpysch();
	this.instance.setTransform(-227.5,-227.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227.5,-227.5,455,455);


(lib.Tween138 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.graphpysch();
	this.instance.setTransform(-227.5,-227.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227.5,-227.5,455,455);


(lib.Tween137 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.graphspirit();
	this.instance.setTransform(-227.5,-227.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227.5,-227.5,455,455);


(lib.Tween136 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.graphspirit();
	this.instance.setTransform(-227.5,-227.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227.5,-227.5,455,455);


(lib.Tween135 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.graphsocial();
	this.instance.setTransform(-227.5,-227.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227.5,-227.5,455,455);


(lib.Tween134 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.graphsocial();
	this.instance.setTransform(-227.5,-227.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227.5,-227.5,455,455);


(lib.Tween133 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Intramuscular analgesia will be avoided due to his neutropenia.", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.35);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.3,853.9,156.7);


(lib.Tween132 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Intramuscular analgesia will be avoided due to his neutropenia.", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.35);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.3,853.9,156.7);


(lib.Tween131 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("An anti pruritic such as paracetamol for his pyrexia which will also help with his pain should be given.", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.35);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.3,853.9,156.7);


(lib.Tween130 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("An anti pruritic such as paracetamol for his pyrexia which will also help with his pain should be given.", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.35);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.3,853.9,156.7);


(lib.Tween129 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("An anti pruritic such as paracetamol for his pyrexia which will also help with his pain should be given.", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.35);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.3,853.9,156.7);


(lib.Tween128 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("An anti pruritic such as paracetamol for his pyrexia which will also help with his pain should be given.", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.35);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.3,853.9,156.7);


(lib.Tween127 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("His pain is 8/10 on the numerical scale along with severe impact on his activities of daily living, therefore a strong opioid is likely required. ", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.35);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.3,853.9,156.7);


(lib.Tween126 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("His pain is 8/10 on the numerical scale along with severe impact on his activities of daily living, therefore a strong opioid is likely required. ", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.35);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.3,853.9,156.7);


(lib.Tween125 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("His pain is 8/10 on the numerical scale along with severe impact on his activities of daily living, therefore a strong opioid is likely required. ", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.35);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.3,853.9,156.7);


(lib.Tween124 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Together Brian and John have discussed his options and have identified that he will take liquid analgesia as prescribed.", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.8,853.9,157.7);


(lib.Tween123 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Together Brian and John have discussed his options and have identified that he will take liquid analgesia as prescribed.", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.8,853.9,157.7);


(lib.Tween122 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Together Brian and John have discussed his options and have identified that he will take liquid analgesia as prescribed.", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 850;
	this.text.parent = this;
	this.text.setTransform(0,-76.85);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-426.9,-78.8,853.9,157.7);


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
	this.instance = new lib.who();
	this.instance.setTransform(-180,-110.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-180,-110.5,360,221);


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
	this.text = new cjs.Text("For the individual", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 255;
	this.text.parent = this;
	this.text.setTransform(0,-25.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-129.5,-27.2,259,54.5);


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
	this.text = new cjs.Text("For the individual", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 255;
	this.text.parent = this;
	this.text.setTransform(0,-25.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-129.5,-27.2,259,54.5);


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
	this.text = new cjs.Text("For the individual", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 255;
	this.text.parent = this;
	this.text.setTransform(0,-25.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-129.5,-27.2,259,54.5);


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
	this.text = new cjs.Text("By the ladder", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 234;
	this.text.parent = this;
	this.text.setTransform(-0.05,-24.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.8,-26.6,237.6,53.3);


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
	this.text = new cjs.Text("By the ladder", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 234;
	this.text.parent = this;
	this.text.setTransform(-0.05,-24.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.8,-26.6,237.6,53.3);


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
	this.text = new cjs.Text("By the ladder", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 234;
	this.text.parent = this;
	this.text.setTransform(-0.05,-24.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.8,-26.6,237.6,53.3);


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
	this.text = new cjs.Text("By the clock", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 234;
	this.text.parent = this;
	this.text.setTransform(-0.05,-24.1);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.8,-26.1,237.6,52.3);


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
	this.text = new cjs.Text("By the clock", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 234;
	this.text.parent = this;
	this.text.setTransform(-0.05,-24.1);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.8,-26.1,237.6,52.3);


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
	this.text = new cjs.Text("By the clock", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 234;
	this.text.parent = this;
	this.text.setTransform(-0.05,-24.1);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.8,-26.1,237.6,52.3);


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
	this.text = new cjs.Text("By the mouth", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 234;
	this.text.parent = this;
	this.text.setTransform(-0.05,-24.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.8,-26.1,237.6,52.3);


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
	this.text = new cjs.Text("By the mouth", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 234;
	this.text.parent = this;
	this.text.setTransform(-0.05,-24.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.8,-26.1,237.6,52.3);


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
	this.text = new cjs.Text("By the mouth", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 234;
	this.text.parent = this;
	this.text.setTransform(-0.05,-24.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.8,-26.1,237.6,52.3);


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
	this.text = new cjs.Text("Analgesia must be given:", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 422;
	this.text.parent = this;
	this.text.setTransform(0,-43.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-212.7,-45.1,425.5,90.30000000000001);


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
	this.text = new cjs.Text("Analgesia must be given:", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 422;
	this.text.parent = this;
	this.text.setTransform(0,-43.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-212.7,-45.1,425.5,90.30000000000001);


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
	this.text = new cjs.Text("Analgesia must be given:", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 422;
	this.text.parent = this;
	this.text.setTransform(0,-43.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-212.7,-45.1,425.5,90.30000000000001);


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
	this.text = new cjs.Text("Patients should be given appropriate information about their pain, and pain management, and be encouraged to participate  in their treatment plan.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 1009;
	this.text.parent = this;
	this.text.setTransform(-0.05,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-506.5,-88.7,1013,177.4);


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
	this.text = new cjs.Text("Patients should be given appropriate information about their pain, and pain management, and be encouraged to participate  in their treatment plan.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 1009;
	this.text.parent = this;
	this.text.setTransform(-0.05,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-506.5,-88.7,1013,177.4);


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
	this.text = new cjs.Text("Patients should be given appropriate information about their pain, and pain management, and be encouraged to participate  in their treatment plan.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 1009;
	this.text.parent = this;
	this.text.setTransform(-0.05,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-506.5,-88.7,1013,177.4);


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
	this.text = new cjs.Text("Patients should be given appropriate information about their pain, and pain management, and be encouraged to participate  in their treatment plan.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 1009;
	this.text.parent = this;
	this.text.setTransform(-0.05,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-506.5,-88.7,1013,177.4);


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
	this.text = new cjs.Text("We need to discuss the best option for you right now", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 287;
	this.text.parent = this;
	this.text.setTransform(0,-102);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(173.5,-124.5,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-173.5,-124.5,347,249);


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
	this.text = new cjs.Text("But it is evident from my assessment that you are in quite a bit of pain and discomfort", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 354;
	this.text.parent = this;
	this.text.setTransform(5.85,-104.3);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(215.15,-158.8,1.24,1.24,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.1,-158.8,430.29999999999995,317.6);


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
	this.text = new cjs.Text("But it is evident from my assessment that you are in quite a bit of pain and discomfort", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 354;
	this.text.parent = this;
	this.text.setTransform(5.85,-104.3);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(215.15,-158.8,1.24,1.24,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.1,-158.8,430.29999999999995,317.6);


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
	this.text = new cjs.Text("But it is evident from my assessment that you are in quite a bit of pain and discomfort", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 354;
	this.text.parent = this;
	this.text.setTransform(5.85,-104.3);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(215.15,-158.8,1.24,1.24,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.1,-158.8,430.29999999999995,317.6);


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
	this.text = new cjs.Text("But it is evident from my assessment that you are in quite a bit of pain and discomfort", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 354;
	this.text.parent = this;
	this.text.setTransform(5.85,-104.3);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(215.15,-158.8,1.24,1.24,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.1,-158.8,430.29999999999995,317.6);


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
	this.text = new cjs.Text("I need to discuss with my preceptor", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 287;
	this.text.parent = this;
	this.text.setTransform(0,-62);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(173.5,-124.5,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-173.5,-124.5,347,249);


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
	this.text = new cjs.Text("I need to discuss with my preceptor", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 287;
	this.text.parent = this;
	this.text.setTransform(0,-62);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(173.5,-124.5,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-173.5,-124.5,347,249);


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
	this.text = new cjs.Text("I need to discuss with my preceptor", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 287;
	this.text.parent = this;
	this.text.setTransform(0,-62);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(173.5,-124.5,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-173.5,-124.5,347,249);


(lib.Tween93 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("I need to discuss with my preceptor", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 287;
	this.text.parent = this;
	this.text.setTransform(0,-62);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(173.5,-124.5,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-173.5,-124.5,347,249);


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
	this.instance = new lib.Nurse_Brian_Sitting_PPE();
	this.instance.setTransform(-103,-192);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-103,-192,206,384);


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
	this.instance = new lib.Patientsitting();
	this.instance.setTransform(-118.5,-199);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118.5,-199,237,398);


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
	this.text = new cjs.Text("Does John feel that it represents a deterioration of his underlying cancer?", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 700;
	this.text.parent = this;
	this.text.setTransform(0,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-351.9,-88.7,703.9,177.4);


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
	this.text = new cjs.Text("Does John feel that it represents a deterioration of his underlying cancer?", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 700;
	this.text.parent = this;
	this.text.setTransform(0,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-351.9,-88.7,703.9,177.4);


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
	this.text = new cjs.Text("Does John feel that it represents a deterioration of his underlying cancer?", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 700;
	this.text.parent = this;
	this.text.setTransform(0,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-351.9,-88.7,703.9,177.4);


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
	this.text = new cjs.Text("Does John feel that it represents a deterioration of his underlying cancer?", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 700;
	this.text.parent = this;
	this.text.setTransform(0,-86.7);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-351.9,-88.7,703.9,177.4);


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
	this.text = new cjs.Text("Determine what the significance of the pain to John is. ", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 637;
	this.text.parent = this;
	this.text.setTransform(0,-91.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-320.4,-93.7,640.9,187.5);


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
	this.text = new cjs.Text("Determine what the significance of the pain is to John.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 637;
	this.text.parent = this;
	this.text.setTransform(0,-91.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-320.4,-93.7,640.9,187.5);


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
	this.text = new cjs.Text("Determine what the significance of the pain is to John. ", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 637;
	this.text.parent = this;
	this.text.setTransform(0,-91.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-320.4,-93.7,640.9,187.5);


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
	this.text = new cjs.Text("Determine what the significance of the pain is to John.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 637;
	this.text.parent = this;
	this.text.setTransform(0,-91.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-320.4,-93.7,640.9,187.5);


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
	this.text = new cjs.Text("Impact of pain on the patient’s psychological state must be explored as a patient’s levels of anxiety and depression can have a significant impact on their pain experience.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 1000;
	this.text.parent = this;
	this.text.setTransform(-6.1,-130.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-508,-132.5,1003.9,265.1);


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
	this.text = new cjs.Text("Some of the spiritual interventions Brian can use include: presence, attentive listening, acceptance and judicious self-disclosure, which may play a role in promoting comfort and diminishing pain.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 979;
	this.text.parent = this;
	this.text.setTransform(-2.05,-122.4);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-493.7,-124.4,983.4,265.1);


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
	this.text = new cjs.Text("Brian can explore and evaluate the spiritual impact of the pain: as cancer pain may impact on a patient from a spiritual perspective. \n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 790;
	this.text.parent = this;
	this.text.setTransform(0,-108.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-396.9,-110.6,793.9,221.3);


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
	this.text = new cjs.Text("Brian can explore and evaluate the spiritual impact of the pain: as cancer pain may impact on a patient from a spiritual perspective. \n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 790;
	this.text.parent = this;
	this.text.setTransform(0,-108.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-396.9,-110.6,793.9,221.3);


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
	this.text = new cjs.Text("Brian can explore and evaluate the spiritual impact of the pain: as cancer pain may impact on a patient from a spiritual perspective. \n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 790;
	this.text.parent = this;
	this.text.setTransform(0,-108.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-396.9,-110.6,793.9,221.3);


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
	this.text = new cjs.Text("Brian can explore and evaluate the spiritual impact of the pain: as cancer pain may impact on a patient from a spiritual perspective. \n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 790;
	this.text.parent = this;
	this.text.setTransform(0,-108.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-396.9,-110.6,793.9,221.3);


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
	this.text = new cjs.Text("Lets take a look at your current medication routine\n\n\n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 422;
	this.text.parent = this;
	this.text.setTransform(14.5,-122.4);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(255,-228.4,1.4699,1.4699,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-255,-228.4,510,456.8);


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
	this.text = new cjs.Text("Lets take a look at your current medication routine\n\n\n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 422;
	this.text.parent = this;
	this.text.setTransform(14.5,-122.4);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(255,-228.4,1.4699,1.4699,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-255,-228.4,510,456.8);


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
	this.text = new cjs.Text("Lets take a look at your current medication routine\n\n\n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 422;
	this.text.parent = this;
	this.text.setTransform(14.5,-122.4);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(255,-228.4,1.4699,1.4699,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-255,-228.4,510,456.8);


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
	this.text = new cjs.Text("Lets take a look at your current medication routine\n\n\n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 422;
	this.text.parent = this;
	this.text.setTransform(14.5,-122.4);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(255,-228.4,1.4699,1.4699,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-255,-228.4,510,456.8);


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
	this.text = new cjs.Text("Burning sensation in his mouth and oesophagus", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 417;
	this.text.parent = this;
	this.text.setTransform(0,-96.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-210.2,-98.6,420.5,197.2);


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
	this.text = new cjs.Text("Burning sensation in his mouth and oesophagus", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 417;
	this.text.parent = this;
	this.text.setTransform(0,-96.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-210.2,-98.6,420.5,197.2);


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
	this.text = new cjs.Text("Burning sensation in his mouth and oesophagus", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 417;
	this.text.parent = this;
	this.text.setTransform(0,-96.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-210.2,-98.6,420.5,197.2);


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
	this.text = new cjs.Text("Burning sensation in his mouth and oesophagus", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 417;
	this.text.parent = this;
	this.text.setTransform(0,-96.6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-210.2,-98.6,420.5,197.2);


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
	this.text = new cjs.Text("No appetite", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 364;
	this.text.parent = this;
	this.text.setTransform(0,-26.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-184,-28.3,368,56.6);


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
	this.text = new cjs.Text("No appetite", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 364;
	this.text.parent = this;
	this.text.setTransform(0,-26.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-184,-28.3,368,56.6);


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
	this.text = new cjs.Text("No appetite", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 364;
	this.text.parent = this;
	this.text.setTransform(0,-26.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-184,-28.3,368,56.6);


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
	this.text = new cjs.Text("No appetite", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 364;
	this.text.parent = this;
	this.text.setTransform(0,-26.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-184,-28.3,368,56.6);


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
	this.text = new cjs.Text("Odynophagia", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 370;
	this.text.parent = this;
	this.text.setTransform(0,-40.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-187.1,-42.2,374.29999999999995,84.4);


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
	this.text = new cjs.Text("Odynophagia", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 370;
	this.text.parent = this;
	this.text.setTransform(0,-40.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-187.1,-42.2,374.29999999999995,84.4);


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
	this.text = new cjs.Text("Odynophagia", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 370;
	this.text.parent = this;
	this.text.setTransform(0,-40.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-187.1,-42.2,374.29999999999995,84.4);


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
	this.text = new cjs.Text("Odynophagia", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 370;
	this.text.parent = this;
	this.text.setTransform(0,-40.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-187.1,-42.2,374.29999999999995,84.4);


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
	this.text = new cjs.Text("Nausea", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 200;
	this.text.parent = this;
	this.text.setTransform(0,-49.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-102,-51.7,204.1,103.5);


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
	this.text = new cjs.Text("Nausea", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 200;
	this.text.parent = this;
	this.text.setTransform(0,-49.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-102,-51.7,204.1,103.5);


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
	this.text = new cjs.Text("Nausea", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 200;
	this.text.parent = this;
	this.text.setTransform(0,-49.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-102,-51.7,204.1,103.5);


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
	this.text = new cjs.Text("Nausea", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 200;
	this.text.parent = this;
	this.text.setTransform(0,-49.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-102,-51.7,204.1,103.5);


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
	this.text = new cjs.Text("Profoundly weak", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 370;
	this.text.parent = this;
	this.text.setTransform(0,-40.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-187.1,-42.2,374.29999999999995,84.4);


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
	this.text = new cjs.Text("Profoundly weak", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 370;
	this.text.parent = this;
	this.text.setTransform(0,-40.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-187.1,-42.2,374.29999999999995,84.4);


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
	this.text = new cjs.Text("Profoundly weak", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 370;
	this.text.parent = this;
	this.text.setTransform(0,-40.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-187.1,-42.2,374.29999999999995,84.4);


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
	this.text = new cjs.Text("Profoundly weak", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 370;
	this.text.parent = this;
	this.text.setTransform(0,-40.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-187.1,-42.2,374.29999999999995,84.4);


(lib.Tween46 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Noticeably pale", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 364;
	this.text.parent = this;
	this.text.setTransform(0,-31.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-184,-33.7,368,67.5);


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
	this.text = new cjs.Text("Noticeably pale", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 364;
	this.text.parent = this;
	this.text.setTransform(0,-31.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-184,-33.7,368,67.5);


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
	this.text = new cjs.Text("Noticeably pale", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 364;
	this.text.parent = this;
	this.text.setTransform(0,-31.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-184,-33.7,368,67.5);


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
	this.text = new cjs.Text("Noticeably pale", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 364;
	this.text.parent = this;
	this.text.setTransform(0,-31.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-184,-33.7,368,67.5);


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
	this.text = new cjs.Text("On admission John was;", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 1056;
	this.text.parent = this;
	this.text.setTransform(0,-36.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-529.8,-38.2,1059.6999999999998,76.4);


(lib.Tween41 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("On admission John was;", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 1056;
	this.text.parent = this;
	this.text.setTransform(0,-36.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-529.8,-38.2,1059.6999999999998,76.4);


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
	this.text = new cjs.Text("On admission John was;", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 1056;
	this.text.parent = this;
	this.text.setTransform(0,-36.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-529.8,-38.2,1059.6999999999998,76.4);


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
	this.text = new cjs.Text("On admission John was;", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 1056;
	this.text.parent = this;
	this.text.setTransform(0,-36.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-529.8,-38.2,1059.6999999999998,76.4);


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
	this.instance = new lib.Patientsitting();
	this.instance.setTransform(-120.85,-202.95,1.02,1.02);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.8,-202.9,241.7,405.9);


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
	this.instance = new lib.Patientsitting();
	this.instance.setTransform(-120.85,-202.95,1.02,1.02);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.8,-202.9,241.7,405.9);


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
	this.instance = new lib.Patientsitting();
	this.instance.setTransform(-120.85,-202.95,1.02,1.02);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.8,-202.9,241.7,405.9);


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
	this.instance = new lib.Patientsitting();
	this.instance.setTransform(-120.85,-202.95,1.02,1.02);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.8,-202.9,241.7,405.9);


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
	this.text = new cjs.Text("He is for protective isolation with low white blood cells count", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-55.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-57.7,582.1,115.5);


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
	this.text = new cjs.Text("He is in protective isolation with low white blood cells count", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-55.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-57.7,582.1,115.5);


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
	this.text = new cjs.Text("He is in protective isolation with low white blood cells count", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-55.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-57.7,582.1,115.5);


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
	this.text = new cjs.Text("He is in protective isolation with low white blood cells count", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-55.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-57.7,582.1,115.5);


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
	this.text = new cjs.Text("He is very pale and weak", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-47.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-49.2,582.1,98.5);


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
	this.text = new cjs.Text("He is very pale and weak", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-47.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-49.2,582.1,98.5);


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
	this.text = new cjs.Text("He is very pale and weak", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-47.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-49.2,582.1,98.5);


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
	this.text = new cjs.Text("He is very uncomfortable", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-47.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-49.2,582.1,98.4);


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
	this.text = new cjs.Text("He is very uncomfortable", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-47.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-49.2,582.1,98.4);


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
	this.text = new cjs.Text("He is very uncomfortable", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-47.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-49.2,582.1,98.4);


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
	this.text = new cjs.Text("Pain on swallowing (odynophagia)", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-47.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-49.2,582.1,98.4);


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
	this.text = new cjs.Text("Pain on swallowing (odynophagia)", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-47.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-49.2,582.1,98.4);


(lib.Tween19 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Pain on swallowing (odynophagia)", "bold 30px 'Leelawadee'");
	this.text.lineHeight = 38;
	this.text.lineWidth = 578;
	this.text.parent = this;
	this.text.setTransform(-289.05,-47.25);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-291,-49.2,582.1,98.4);


(lib.Tween18 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.painGraph();
	this.instance.setTransform(-227.5,-227.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227.5,-227.5,455,455);


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
	this.instance = new lib.nurse_brian_ppe();
	this.instance.setTransform(-86.5,-245);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.5,-245,173,490);


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
	this.instance = new lib.Diagram();
	this.instance.setTransform(-160,24,0.76,0.76);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-160,24,280.5,148.2);


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
	this.instance = new lib.Nurse_Brian_Sitting_PPE();
	this.instance.setTransform(-122.55,-228.45,1.19,1.19);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.5,-228.4,245.1,456.9);


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
	this.instance = new lib.Nurse_Brian_Sitting_PPE();
	this.instance.setTransform(-122.55,-228.45,1.19,1.19);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.5,-228.4,245.1,456.9);


(lib.Tween11 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Patientsitting();
	this.instance.setTransform(-136.25,-228.85,1.15,1.15);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-136.2,-228.8,272.5,457.70000000000005);


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
	this.instance = new lib.Patientsitting();
	this.instance.setTransform(-136.25,-228.85,1.15,1.15);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-136.2,-228.8,272.5,457.70000000000005);


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
	this.instance = new lib.nurse_brian_ppe();
	this.instance.setTransform(-86.5,-245);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.5,-245,173,490);


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
	this.instance = new lib.nurse_brian_ppe();
	this.instance.setTransform(-86.5,-245);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.5,-245,173,490);


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
	this.instance = new lib.paingraph2();
	this.instance.setTransform(-269.9,-163.5,0.56,0.56);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-269.9,-163.5,539.8,327.1);


(lib.Tween6 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.painGraph();
	this.instance.setTransform(-227.5,-227.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227.5,-227.5,455,455);


(lib.Tween5 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-625,-462.5,1.195,1.1951);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-625,-462.5,1250,925);


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
	this.instance = new lib.nurse_brian();
	this.instance.setTransform(-86,-245);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-245,172,490);


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.nurse_brian();
	this.instance.setTransform(-86,-245);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-245,172,490);


(lib.ThinkB3 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Impeccable pain assessment", "bold 46px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 57;
	this.text.lineWidth = 252;
	this.text.parent = this;
	this.text.setTransform(-6,-102.5);

	this.instance = new lib.think_bubble();
	this.instance.setTransform(-182,-134);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-182,-134,365,282);


(lib.ThinkB2 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("How to do this?", "bold 46px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 57;
	this.text.lineWidth = 252;
	this.text.parent = this;
	this.text.setTransform(2.5,-83.5);

	this.instance = new lib.think_bubble();
	this.instance.setTransform(-180,-140);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-180,-140,365,282);


(lib.ThinkB1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Goal: Treat and ease the pain ", "bold 46px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 57;
	this.text.lineWidth = 252;
	this.text.parent = this;
	this.text.setTransform(5,-108.5);

	this.instance = new lib.think_bubble();
	this.instance.setTransform(-181,-141);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-181,-141,365,282);


(lib.TextReflect2 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Brian may discuss the social components of Johns life including his family: this may identify if there are concerns from this domain affecting his pain. ", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 790;
	this.text.parent = this;
	this.text.setTransform(32,-91.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-364.9,-93.9,793.9,221.3);


(lib.TextReflect1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Brian reflects on the information gathered from the characteristic assessment", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 777;
	this.text.parent = this;
	this.text.setTransform(25.5,-91.9);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-364.9,-93.9,780.9,172);


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
	this.text = new cjs.Text("The patient should be the prime assessor of his or her pain.", "bold 28px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 671;
	this.text.parent = this;
	this.text.setTransform(-28.5,-100.75);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-365.9,-102.7,674.9,163.8);


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
	this.text = new cjs.Text("Systematic assessment of cancer pain including physical, psychological and spiritual domains is essential.", "bold 28px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 648;
	this.text.parent = this;
	this.text.setTransform(-156,-112.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-481.9,-114.3,651.9,144.2);


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
	this.text = new cjs.Text("Brian recalls pain assessment from his palliative care module prior to his internship", "bold 46px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 57;
	this.text.lineWidth = 774;
	this.text.parent = this;
	this.text.setTransform(-22,-163.95);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-410.9,-165.9,777.9,180);


(lib.Text1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Pain is inherently subjective; therefore the patient should be the prime assessor of his or her pain ", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 495;
	this.text.parent = this;
	this.text.setTransform(-294.6,-109.95);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-543.9,-111.9,498.7,221.2);


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
	this.text = new cjs.Text("START", "bold 87px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 106;
	this.text.lineWidth = 362;
	this.text.parent = this;
	this.text.setTransform(9,-49.95);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("A7CISQiFAAAAiWIAAr3QAAiWCFAAMA2FAAAQCFAAAACWIAAL3QAACWiFAAg");
	this.shape.setTransform(5.525,3.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-180.9,-51.9,372.9,108);


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
	this.text = new cjs.Text("I will now begin your pain assessment ", "bold 36px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 45;
	this.text.lineWidth = 252;
	this.text.parent = this;
	this.text.setTransform(-2,-98);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(168,-119,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-179,-119,347,249);


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
	this.text = new cjs.Text("I need to assess you in terms of your pain ", "bold 38px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 47;
	this.text.lineWidth = 252;
	this.text.parent = this;
	this.text.setTransform(4,-98);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-179,-119);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-179,-119,347,249);


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
	this.text = new cjs.Text("I am in a lot of pain ", "bold 46px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 57;
	this.text.lineWidth = 252;
	this.text.parent = this;
	this.text.setTransform(4,-67.65);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(168,-119,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-179,-119,347,249);


(lib.Q10Patient2 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("I have no allergies.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 386;
	this.text.parent = this;
	this.text.setTransform(-2.35,-43.65);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-175,-135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-197.3,-135,390,354.5);


(lib.Q10Patient1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("My doctor has prescribed me something but I don't think it's working.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 386;
	this.text.parent = this;
	this.text.setTransform(-2.35,-122.65);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-196,-150,1.12,1.12);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-197.3,-150,390,290.5);


(lib.Q10Nurse2 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Have you any known drug allergies?\n\n\n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 422;
	this.text.parent = this;
	this.text.setTransform(-6.45,-72);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(244.05,-204,1.4699,1.4699,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-266,-204,510.1,482.8);


(lib.Q10Nurse = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Can you tell me about your current medication plan and how this has been working? \n\n\n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 422;
	this.text.parent = this;
	this.text.setTransform(-6.45,-116);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(244.05,-204,1.4699,1.4699,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-266,-204,510.1,438.8);


(lib.Q10 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Analgesic Response    ", "bold 25px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(-138,-74.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AuhliIdDAAIAALFI9DAAg");
	this.shape.setTransform(-136.975,-39.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#305053").s().p("AuhFjIAArFIdDAAIAALFg");
	this.shape_1.setTransform(-136.975,-39.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-76.4,187.9,92.10000000000001);


(lib.Q9Patient2 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("My wife Bridget has been looking after me.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 283;
	this.text.parent = this;
	this.text.setTransform(-2,-81.65);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-175,-135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-135,347,272.6);


(lib.Q9Patient1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("I am in too much pain to do the things I enjoy.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 283;
	this.text.parent = this;
	this.text.setTransform(-2,-88.65);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-175,-135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-135,347,265.6);


(lib.Q9Nurse = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("\nCan you describe if the pain is affecting your ability to carry out daily activities and ability to care for yourself?  \n\n\n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 397;
	this.text.parent = this;
	this.text.setTransform(-11.5,-192);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(244.05,-204,1.4699,1.4699,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-266,-204,510.1,494.4);


(lib.Q9 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Function    ", "bold 25px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(-138,-56.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AuhliIdDAAIAALFI9DAAg");
	this.shape.setTransform(-136.975,-39.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#305053").s().p("AuhFjIAArFIdDAAIAALFg");
	this.shape_1.setTransform(-136.975,-39.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-75.9,187.9,109.60000000000001);


(lib.Q8Patient1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("8. I have never been in so much pain before.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 283;
	this.text.parent = this;
	this.text.setTransform(-2,-87.65);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-175,-135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-135,347,266.6);


(lib.Q8Nurse = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("On a numerical\nrating scale of 0-10;\n0 being no pain and 10 being the worse pain imaginable. Can you rate the pain you are in right now? \n\n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 461;
	this.text.parent = this;
	this.text.setTransform(-6.55,-179);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(249.5,-207,1.5,1.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-271,-207,520.5,466.5);


(lib.Q8 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Severity    ", "bold 25px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(-138,-56.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AuhliIdDAAIAALFI9DAAg");
	this.shape.setTransform(-136.975,-39.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#305053").s().p("AuhFjIAArFIdDAAIAALFg");
	this.shape_1.setTransform(-136.975,-39.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-75.9,187.9,109.60000000000001);


(lib.Q7Patient1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("It moves from my mouth and throat to my stomach", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 283;
	this.text.parent = this;
	this.text.setTransform(-2,-100.65);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-175,-135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-135,347,253.6);


(lib.Q7Nurse = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("\nCan you describe if the pain moves or travels within the body?\n\n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 397;
	this.text.parent = this;
	this.text.setTransform(-11.5,-128);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(211.15,-180,1.28,1.28,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233,-180,444.2,402.8);


(lib.Q7 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Radiation    ", "bold 25px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(-138,-56.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AuhliIdDAAIAALFI9DAAg");
	this.shape.setTransform(-136.975,-39.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#305053").s().p("AuhFjIAArFIdDAAIAALFg");
	this.shape_1.setTransform(-136.975,-39.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-75.9,187.9,109.60000000000001);


(lib.Q6Patient1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("It is there all day. It does not stop.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 283;
	this.text.parent = this;
	this.text.setTransform(-2,-76.65);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-175,-135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-135,347,277.6);


(lib.Q6Nurse = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("\nWhen does it start and can you tell me how long it lasts?\n\n", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 397;
	this.text.parent = this;
	this.text.setTransform(-11.5,-126);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(211.15,-180,1.28,1.28,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233,-180,444.2,404.8);


(lib.Q6 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Duration    ", "bold 25px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(-138,-56.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AuhliIdDAAIAALFI9DAAg");
	this.shape.setTransform(-136.975,-39.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#305053").s().p("AuhFjIAArFIdDAAIAALFg");
	this.shape_1.setTransform(-136.975,-39.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-75.9,187.9,109.60000000000001);


(lib.Q5Patient1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("It hurts all the time.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 283;
	this.text.parent = this;
	this.text.setTransform(-1.5,-61.1);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-175,-135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-135,347,293.2);


(lib.Q5Nurse = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("\nIs there any specific time of day or an activity that exacerbates the pain? ", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 397;
	this.text.parent = this;
	this.text.setTransform(-11.5,-174);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(211.15,-180,1.28,1.28,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233,-180,444.2,356.8);


(lib.Q5 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Time    ", "bold 25px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(-138,-56.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AuhliIdDAAIAALFI9DAAg");
	this.shape.setTransform(-136.975,-39.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#305053").s().p("AuhFjIAArFIdDAAIAALFg");
	this.shape_1.setTransform(-136.975,-39.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-75.9,187.9,109.60000000000001);


(lib.Q4Patient1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Eating and swallowing makes it worse.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 283;
	this.text.parent = this;
	this.text.setTransform(-1.5,-99.1);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-175,-135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-135,347,255.2);


(lib.Q4Nurse = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("\nCan you identify anything that makes the pain worse? ", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 397;
	this.text.parent = this;
	this.text.setTransform(-11.5,-141);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(211.15,-180,1.28,1.28,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233,-180,444.2,346);


(lib.Q4 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Exacerbating Factors    ", "bold 25px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(-138,-71.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AuhliIdDAAIAALFI9DAAg");
	this.shape.setTransform(-136.975,-39.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#305053").s().p("AuhFjIAArFIdDAAIAALFg");
	this.shape_1.setTransform(-136.975,-39.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-75.9,187.9,94.60000000000001);


(lib.Q3Patient1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Not eating or drinking helps the pain.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 283;
	this.text.parent = this;
	this.text.setTransform(-1.5,-88.1);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-175,-135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-135,347,266.2);


(lib.Q3Nurse = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("\nCan you identify anything that helps relieve the pain? ", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 397;
	this.text.parent = this;
	this.text.setTransform(-11.5,-134);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(211.15,-180,1.28,1.28,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233,-180,444.2,353);


(lib.Q3 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Relieving Factors    ", "bold 25px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(-138,-71.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AuhliIdDAAIAALFI9DAAg");
	this.shape.setTransform(-136.975,-39.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#305053").s().p("AuhFjIAArFIdDAAIAALFg");
	this.shape_1.setTransform(-136.975,-39.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-75.9,187.9,94.60000000000001);


(lib.Q2Patient1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("It feels like my mouth and throat are burning!", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 258;
	this.text.parent = this;
	this.text.setTransform(0,-102.9);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-175,-135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-135,347,249);


(lib.Q2Nurse = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("\nCan you describe\nusing your own words the type of pain that you are experiencing?", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 397;
	this.text.parent = this;
	this.text.setTransform(-9.5,-178);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(211.15,-180,1.28,1.28,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233,-180,444.2,318.7);


(lib.Q2 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Type/Quality ", "bold 25px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(-138,-58.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AuhliIdDAAIAALFI9DAAg");
	this.shape.setTransform(-136.975,-39.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#305053").s().p("AuhFjIAArFIdDAAIAALFg");
	this.shape_1.setTransform(-136.975,-39.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-75.9,187.9,107.60000000000001);


(lib.Q1Patient1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("My mouth and throat hurt.", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 258;
	this.text.parent = this;
	this.text.setTransform(0,-66.9);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(-175,-135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-135,347,249);


(lib.Q1Nurse = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Can you tell me where the pain is?", "bold 35px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 44;
	this.text.lineWidth = 258;
	this.text.parent = this;
	this.text.setTransform(0,-80.9);

	this.instance = new lib.Speechbubble();
	this.instance.setTransform(172,-135,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-135,347,249);


(lib.Q1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Where", "bold 25px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(-138,-58.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AuhliIdDAAIAALFI9DAAg");
	this.shape.setTransform(-136.975,-39.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#305053").s().p("AuhFjIAArFIdDAAIAALFg");
	this.shape_1.setTransform(-136.975,-39.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-75.9,187.9,106);


(lib.Pain2Text = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Pain can be related to many causal factors ", "bold 38px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 47;
	this.text.lineWidth = 631;
	this.text.parent = this;
	this.text.setTransform(27.5,-107.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-289.9,-109.3,634.9,144.2);


(lib.Pain1Text = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Brian takes a moment to reflect on pain and its assessment ", "bold 38px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 47;
	this.text.lineWidth = 613;
	this.text.parent = this;
	this.text.setTransform(18.5,-107.3);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-289.9,-109.3,616.9,144.2);


(lib.Layer8 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.nurse_brian_ppe();
	this.instance.setTransform(124,-249);

	this.instance_1 = new lib.Nurse1();
	this.instance_1.setTransform(-74,-233,0.78,0.78);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_2
	this.instance_2 = new lib.Background2();
	this.instance_2.setTransform(-420,-458);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-420,-458,1027,768);


(lib.IntroText7 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("He has grade 4 mucositis and is neutropenic ", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 907;
	this.text.parent = this;
	this.text.setTransform(32.5,-170.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-422.9,-172,910.9,185.1);


(lib.IntroText5 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("John was attending the Oncology Day Ward for his Day 10 bloods following his second Cycle of Chemotherapy. ", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 907;
	this.text.parent = this;
	this.text.setTransform(32.5,-170.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-422.9,-172,910.9,227.1);


(lib.IntroText4 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("He has no past medical history. John was referred by his GP to the rapid access clinic, whereby the relevant work up led to his diagnosis. ", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 901;
	this.text.parent = this;
	this.text.setTransform(29.5,-170.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-422.9,-172,904.9,227.1);


(lib.IntroText3 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("He visited his GP with a persistent dry cough from the last 4 months with an unintentional 10-lb weight loss", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 893;
	this.text.parent = this;
	this.text.setTransform(25.5,-170.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-422.9,-172,896.9,227.1);


(lib.IntroText2 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("He was diagnosed with lung cancer two months ago. ", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 816;
	this.text.parent = this;
	this.text.setTransform(-13,-170.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-422.9,-172,819.9,177.1);


(lib.IntroText1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("John is 68 years old. He is married to Bridget and has two adult children, who live abroad. ", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 810;
	this.text.parent = this;
	this.text.setTransform(-16,-170.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-422.9,-172,813.9,177.1);


(lib.Img_Comfort2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.nurse_comforting();
	this.instance.setTransform(-48,-112);

	this.instance_1 = new lib.Background();
	this.instance_1.setTransform(-504,-405,1.195,1.195);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-504,-405,1250,925);


(lib.Img_Comfort1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.nurse_comforting_1();
	this.instance.setTransform(-48,-112);

	this.instance_1 = new lib.Background();
	this.instance_1.setTransform(-506,-406,1.195,1.195);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-506,-406,1250,925);


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
	this.text = new cjs.Text("Continue   ", "bold 25px 'Leelawadee'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 32;
	this.text.lineWidth = 166;
	this.text.parent = this;
	this.text.setTransform(-138,-58.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AuhliIdDAAIAALFI9DAAg");
	this.shape.setTransform(-136.975,-39.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#305053").s().p("AuhFjIAArFIdDAAIAALFg");
	this.shape_1.setTransform(-136.975,-39.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-75.9,187.9,107.60000000000001);


(lib.BrianIntro4 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("John, the patient, has arrived at the ward\n\nBrian notes:\n", "bold 44px 'Leelawadee'");
	this.text.lineHeight = 55;
	this.text.lineWidth = 907;
	this.text.parent = this;
	this.text.setTransform(-420.95,-170.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-422.9,-172,910.9,275);


(lib.BrianIntro3 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("He has been on the acute medical ward for 3 weeks. ", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 907;
	this.text.parent = this;
	this.text.setTransform(32.5,-170.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-422.9,-172,910.9,220.4);


(lib.BrianIntro2 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("He feels relatively confident in his approach to caring for his patients.", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 907;
	this.text.parent = this;
	this.text.setTransform(32.5,-170.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-422.9,-172,910.9,220.4);


(lib.BrianIntro1 = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Brian is an intern student nurse on a placement in the acute hospital setting.", "bold 44px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 55;
	this.text.lineWidth = 907;
	this.text.parent = this;
	this.text.setTransform(32.5,-170.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-422.9,-172,910.9,165.8);


(lib.BrianDiscuss = function(mode,startPosition,loop,reversed) {
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
	this.text = new cjs.Text("Brian will now discuss Johns case with his preceptor", "bold 30px 'Leelawadee'");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 754;
	this.text.parent = this;
	this.text.setTransform(68,-169.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-310.9,-171.6,757.9,103.69999999999999);


(lib.TextReflect4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// L1
	this.instance = new lib.Tween80("synched",0);
	this.instance.setTransform(46,-5.9);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},21).to({startPosition:0},109).to({alpha:0},24).to({_off:true},1).wait(213));

	// L2
	this.instance_1 = new lib.Tween83("synched",0);
	this.instance_1.setTransform(29.5,-32.7);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween84("synched",0);
	this.instance_2.setTransform(29.5,-32.7);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween85("synched",0);
	this.instance_3.setTransform(29.5,-32.7);
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween86("synched",0);
	this.instance_4.setTransform(29.5,-32.7);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},154).to({state:[{t:this.instance_2}]},18).to({state:[{t:this.instance_3}]},66).to({state:[{t:this.instance_4}]},17).to({state:[]},1).wait(112));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(154).to({_off:false},0).to({_off:true,alpha:1},18).wait(196));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(154).to({_off:false},18).to({_off:true},66).wait(130));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(172).to({_off:false},66).to({_off:true,alpha:0},17).wait(113));

	// L3
	this.instance_5 = new lib.Tween87("synched",0);
	this.instance_5.setTransform(60,-31.75);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.instance_6 = new lib.Tween88("synched",0);
	this.instance_6.setTransform(60,-31.75);
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween89("synched",0);
	this.instance_7.setTransform(60,-31.75);
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween90("synched",0);
	this.instance_8.setTransform(60,-31.75);
	this.instance_8.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5}]},255).to({state:[{t:this.instance_6}]},17).to({state:[{t:this.instance_7}]},77).to({state:[{t:this.instance_8}]},18).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(255).to({_off:false},0).to({_off:true,alpha:1},17).wait(96));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(255).to({_off:false},17).to({_off:true},77).wait(19));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(272).to({_off:false},77).to({_off:true,alpha:0},18).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-462,-138.4,1003.9,265.1);


(lib.TextReflect3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1_copy
	this.instance = new lib.Tween71("synched",0);
	this.instance.setTransform(32,16.7);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween72("synched",0);
	this.instance_1.setTransform(32,16.7);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween73("synched",0);
	this.instance_2.setTransform(32,16.7);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween74("synched",0);
	this.instance_3.setTransform(32,16.7);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},20).to({state:[{t:this.instance_2}]},80).to({state:[{t:this.instance_3}]},21).to({state:[]},1).wait(160));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},20).wait(262));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},20).to({_off:true},80).wait(182));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(20).to({_off:false},80).to({_off:true,alpha:0},21).wait(161));

	// Layer_1
	this.instance_4 = new lib.Tween76("synched",0);
	this.instance_4.setTransform(21,-2.75);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(121).to({_off:false},0).to({alpha:1},18).to({startPosition:0},124).to({alpha:0},18).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-472.7,-127.1,983.4,265.1);


(lib.SpeechPreceptor = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// SB1
	this.instance = new lib.Tween93("synched",0);
	this.instance.setTransform(3.5,-7.5);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween94("synched",0);
	this.instance_1.setTransform(3.5,-7.5);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween95("synched",0);
	this.instance_2.setTransform(3.5,-7.5);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween96("synched",0);
	this.instance_3.setTransform(3.5,-7.5);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},24).to({state:[{t:this.instance_2}]},55).to({state:[{t:this.instance_3}]},21).to({state:[]},1).wait(235));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},24).wait(312));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},24).to({_off:true},55).wait(257));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(24).to({_off:false},55).to({_off:true,alpha:0},21).wait(236));

	// SB2
	this.instance_4 = new lib.Tween97("synched",0);
	this.instance_4.setTransform(-7.85,-17.2);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.instance_5 = new lib.Tween98("synched",0);
	this.instance_5.setTransform(-7.85,-17.2);
	this.instance_5._off = true;

	this.instance_6 = new lib.Tween99("synched",0);
	this.instance_6.setTransform(-7.85,-17.2);
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween100("synched",0);
	this.instance_7.setTransform(-7.85,-17.2);
	this.instance_7.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},100).to({state:[{t:this.instance_5}]},19).to({state:[{t:this.instance_6}]},101).to({state:[{t:this.instance_7}]},19).to({state:[]},1).wait(96));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(100).to({_off:false},0).to({_off:true,alpha:1},19).wait(217));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(100).to({_off:false},19).to({_off:true},101).wait(116));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(119).to({_off:false},101).to({_off:true,alpha:0},19).wait(97));

	// SB3
	this.instance_8 = new lib.Tween101("synched",0);
	this.instance_8.setTransform(3.5,-7.5);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(240).to({_off:false},0).to({alpha:1},17).to({startPosition:0},62).to({alpha:0},16).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-223,-176,430.3,317.6);


(lib.Q10Nurse3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Nurse3
	this.instance = new lib.Tween67("synched",0);
	this.instance.setTransform(-10.95,24.4);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween68("synched",0);
	this.instance_1.setTransform(-10.95,24.4);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween69("synched",0);
	this.instance_2.setTransform(-10.95,24.4);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween70("synched",0);
	this.instance_3.setTransform(-10.95,24.4);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},14).to({state:[{t:this.instance_2}]},75).to({state:[{t:this.instance_3}]},20).to({state:[]},1).wait(75));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},14).wait(171));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},14).to({_off:true},75).wait(96));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},75).to({_off:true,alpha:0},20).wait(76));

	// Nurse4
	this.instance_4 = new lib.Q10Nurse2("synched",0);
	this.instance_4.setTransform(-15.95,37.8,1,1,0,0,0,-11,37.4);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(109).to({_off:false},0).to({alpha:1},17).to({startPosition:0},43).to({alpha:0},15).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.9,-204,515,483.2);


(lib.PainTogether = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// L1
	this.instance = new lib.Tween122("synched",0);
	this.instance.setTransform(20,-127.8);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween123("synched",0);
	this.instance_1.setTransform(20,-127.8);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween124("synched",0);
	this.instance_2.setTransform(20,-127.8);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},14).wait(488));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},14).to({_off:true},127).wait(361));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},127).to({alpha:0},13).to({_off:true},1).wait(347));

	// L2
	this.instance_3 = new lib.Tween125("synched",0);
	this.instance_3.setTransform(20,-128.3);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween126("synched",0);
	this.instance_4.setTransform(20,-128.3);
	this.instance_4._off = true;

	this.instance_5 = new lib.Tween127("synched",0);
	this.instance_5.setTransform(20,-128.3);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(141).to({_off:false},0).to({_off:true,alpha:1},13).wait(348));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(141).to({_off:false},13).to({_off:true},116).wait(232));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(154).to({_off:false},116).to({alpha:0},15).to({_off:true},1).wait(216));

	// L3
	this.instance_6 = new lib.Tween128("synched",0);
	this.instance_6.setTransform(20,-128.3);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween129("synched",0);
	this.instance_7.setTransform(20,-128.3);
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween130("synched",0);
	this.instance_8.setTransform(20,-128.3);
	this.instance_8._off = true;

	this.instance_9 = new lib.Tween131("synched",0);
	this.instance_9.setTransform(20,-128.3);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(270).to({_off:false},0).to({_off:true,alpha:1},15).wait(217));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(270).to({_off:false},15).to({_off:true},92).wait(125));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(285).to({_off:false},92).to({_off:true},15).wait(110));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(377).to({_off:false},15).to({alpha:0},14).to({_off:true},1).wait(95));

	// L4
	this.instance_10 = new lib.Tween132("synched",0);
	this.instance_10.setTransform(20,-128.3);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.instance_11 = new lib.Tween133("synched",0);
	this.instance_11.setTransform(20,-128.3);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(392).to({_off:false},0).to({_off:true,alpha:1},14).wait(96));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(392).to({_off:false},14).to({startPosition:0},78).to({alpha:0},17).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-406.9,-206.6,853.9,157.7);


(lib.pain = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Tween102("synched",0);
	this.instance.setTransform(-10.45,-527.5);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween103("synched",0);
	this.instance_1.setTransform(-10.45,-527.5);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween104("synched",0);
	this.instance_2.setTransform(-10.45,-527.5);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween105("synched",0);
	this.instance_3.setTransform(-10.45,-527.5);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},28).to({state:[{t:this.instance_2}]},151).to({state:[{t:this.instance_3}]},22).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},28).wait(174));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},28).to({_off:true},151).wait(23));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(28).to({_off:false},151).to({_off:true,alpha:0},22).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-516.9,-616.2,1012.9,177.40000000000003);


(lib.IntroText6 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Tween39("synched",0);
	this.instance.setTransform(529.8,-133.85);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween40("synched",0);
	this.instance_1.setTransform(529.8,-133.85);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween41("synched",0);
	this.instance_2.setTransform(529.8,-133.85);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween42("synched",0);
	this.instance_3.setTransform(529.8,-133.85);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},29).to({state:[{t:this.instance_2}]},143).to({state:[{t:this.instance_3}]},16).to({state:[]},1).wait(57));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},29).wait(217));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},29).to({_off:true},143).wait(74));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(29).to({_off:false},143).to({_off:true,alpha:0},16).wait(58));

	// L1
	this.instance_4 = new lib.Tween43("synched",0);
	this.instance_4.setTransform(238.8,4.4);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.instance_5 = new lib.Tween44("synched",0);
	this.instance_5.setTransform(238.8,4.4);
	this.instance_5._off = true;

	this.instance_6 = new lib.Tween45("synched",0);
	this.instance_6.setTransform(238.8,4.4);
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween46("synched",0);
	this.instance_7.setTransform(238.8,4.4);
	this.instance_7.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},29).to({state:[{t:this.instance_5}]},29).to({state:[{t:this.instance_6}]},114).to({state:[{t:this.instance_7}]},16).to({state:[]},1).wait(57));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(29).to({_off:false},0).to({_off:true,alpha:1},29).wait(188));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(29).to({_off:false},29).to({_off:true},114).wait(74));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(58).to({_off:false},114).to({_off:true,alpha:0},16).wait(58));

	// L2
	this.instance_8 = new lib.Tween47("synched",0);
	this.instance_8.setTransform(187.1,218.55);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.instance_9 = new lib.Tween48("synched",0);
	this.instance_9.setTransform(187.1,218.55);
	this.instance_9._off = true;

	this.instance_10 = new lib.Tween49("synched",0);
	this.instance_10.setTransform(187.1,218.55);
	this.instance_10._off = true;

	this.instance_11 = new lib.Tween50("synched",0);
	this.instance_11.setTransform(187.1,218.55);
	this.instance_11.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8}]},43).to({state:[{t:this.instance_9}]},29).to({state:[{t:this.instance_10}]},100).to({state:[{t:this.instance_11}]},16).to({state:[]},1).wait(57));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(43).to({_off:false},0).to({_off:true,alpha:1},29).wait(174));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(43).to({_off:false},29).to({_off:true},100).wait(74));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(72).to({_off:false},100).to({_off:true,alpha:0},16).wait(58));

	// L3
	this.instance_12 = new lib.Tween51("synched",0);
	this.instance_12.setTransform(183.5,431.15);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.instance_13 = new lib.Tween52("synched",0);
	this.instance_13.setTransform(183.5,431.15);
	this.instance_13._off = true;

	this.instance_14 = new lib.Tween53("synched",0);
	this.instance_14.setTransform(183.5,431.15);
	this.instance_14._off = true;

	this.instance_15 = new lib.Tween54("synched",0);
	this.instance_15.setTransform(183.5,431.15);
	this.instance_15.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_12}]},56).to({state:[{t:this.instance_13}]},29).to({state:[{t:this.instance_14}]},87).to({state:[{t:this.instance_15}]},16).to({state:[]},1).wait(57));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(56).to({_off:false},0).to({_off:true,alpha:1},29).wait(161));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(56).to({_off:false},29).to({_off:true},87).wait(74));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(85).to({_off:false},87).to({_off:true,alpha:0},16).wait(58));

	// L4
	this.instance_16 = new lib.Tween55("synched",0);
	this.instance_16.setTransform(739,12.85);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.instance_17 = new lib.Tween56("synched",0);
	this.instance_17.setTransform(739,12.85);
	this.instance_17._off = true;

	this.instance_18 = new lib.Tween57("synched",0);
	this.instance_18.setTransform(739,12.85);
	this.instance_18._off = true;

	this.instance_19 = new lib.Tween58("synched",0);
	this.instance_19.setTransform(739,12.85);
	this.instance_19.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_16}]},69).to({state:[{t:this.instance_17}]},29).to({state:[{t:this.instance_18}]},74).to({state:[{t:this.instance_19}]},16).to({state:[]},1).wait(57));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(69).to({_off:false},0).to({_off:true,alpha:1},29).wait(148));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(69).to({_off:false},29).to({_off:true},74).wait(74));
	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(98).to({_off:false},74).to({_off:true,alpha:0},16).wait(58));

	// L5
	this.instance_20 = new lib.Tween59("synched",0);
	this.instance_20.setTransform(876.15,204.65);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.instance_21 = new lib.Tween60("synched",0);
	this.instance_21.setTransform(876.15,204.65);
	this.instance_21._off = true;

	this.instance_22 = new lib.Tween61("synched",0);
	this.instance_22.setTransform(876.15,204.65);
	this.instance_22._off = true;

	this.instance_23 = new lib.Tween62("synched",0);
	this.instance_23.setTransform(876.15,204.65);
	this.instance_23.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_20}]},83).to({state:[{t:this.instance_21}]},29).to({state:[{t:this.instance_22}]},60).to({state:[{t:this.instance_23}]},16).to({state:[]},1).wait(57));
	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(83).to({_off:false},0).to({_off:true,alpha:1},29).wait(134));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(83).to({_off:false},29).to({_off:true},60).wait(74));
	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(112).to({_off:false},60).to({_off:true,alpha:0},16).wait(58));

	// L6
	this.instance_24 = new lib.Tween63("synched",0);
	this.instance_24.setTransform(850.05,478);
	this.instance_24.alpha = 0;
	this.instance_24._off = true;

	this.instance_25 = new lib.Tween64("synched",0);
	this.instance_25.setTransform(850.05,478);
	this.instance_25._off = true;

	this.instance_26 = new lib.Tween65("synched",0);
	this.instance_26.setTransform(850.05,478);
	this.instance_26._off = true;

	this.instance_27 = new lib.Tween66("synched",0);
	this.instance_27.setTransform(850.05,478);
	this.instance_27.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_24}]},96).to({state:[{t:this.instance_25}]},29).to({state:[{t:this.instance_26}]},47).to({state:[{t:this.instance_27}]},16).to({state:[]},1).wait(57));
	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(96).to({_off:false},0).to({_off:true,alpha:1},29).wait(121));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(96).to({_off:false},29).to({_off:true},47).wait(74));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(125).to({_off:false},47).to({_off:true,alpha:0},16).wait(58));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-172,1060.3,748.6);


(lib.BiranNotesV2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// L1
	this.instance = new lib.Tween19("synched",0);
	this.instance.setTransform(272.65,-144.45);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween20("synched",0);
	this.instance_1.setTransform(272.65,-144.45);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween22("synched",0);
	this.instance_2.setTransform(272.65,-144.45);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},29).wait(221));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},29).to({_off:true},190).wait(31));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(29).to({_off:false},190).to({alpha:0},30).wait(1));

	// L2
	this.instance_3 = new lib.Tween23("synched",0);
	this.instance_3.setTransform(272.65,-46);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween24("synched",0);
	this.instance_4.setTransform(272.65,-46);
	this.instance_4._off = true;

	this.instance_5 = new lib.Tween26("synched",0);
	this.instance_5.setTransform(272.65,-46);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(29).to({_off:false},0).to({_off:true,alpha:1},29).wait(192));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(29).to({_off:false},29).to({_off:true},161).wait(31));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(58).to({_off:false},161).to({alpha:0},30).wait(1));

	// L3
	this.instance_6 = new lib.Tween27("synched",0);
	this.instance_6.setTransform(272.65,52.4);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween28("synched",0);
	this.instance_7.setTransform(272.65,52.4);
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween30("synched",0);
	this.instance_8.setTransform(272.65,52.4);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(58).to({_off:false},0).to({_off:true,alpha:1},29).wait(163));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(58).to({_off:false},29).to({_off:true},132).wait(31));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(87).to({_off:false},132).to({alpha:0},30).wait(1));

	// L4
	this.instance_9 = new lib.Tween31("synched",0);
	this.instance_9.setTransform(272.65,159.4);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.instance_10 = new lib.Tween32("synched",0);
	this.instance_10.setTransform(272.65,159.4);
	this.instance_10._off = true;

	this.instance_11 = new lib.Tween33("synched",0);
	this.instance_11.setTransform(272.65,159.4);
	this.instance_11._off = true;

	this.instance_12 = new lib.Tween34("synched",0);
	this.instance_12.setTransform(272.65,159.4);
	this.instance_12.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9}]},87).to({state:[{t:this.instance_10}]},29).to({state:[{t:this.instance_11}]},103).to({state:[{t:this.instance_12}]},30).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(87).to({_off:false},0).to({_off:true,alpha:1},29).wait(134));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(87).to({_off:false},29).to({_off:true},103).wait(31));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(116).to({_off:false},103).to({_off:true,alpha:0},30).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-193.7,582.1,410.9);


(lib.Analgesia = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Analgesia
	this.instance = new lib.Tween106("synched",0);
	this.instance.setTransform(-346.4,-59.95);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween107("synched",0);
	this.instance_1.setTransform(-346.4,-59.95);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween108("synched",0);
	this.instance_2.setTransform(-346.4,-59.95);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},19).wait(373));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},19).to({_off:true},349).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(19).to({_off:false},349).to({alpha:0},23).wait(1));

	// mouth
	this.instance_3 = new lib.Tween109("synched",0);
	this.instance_3.setTransform(-437.8,26.15);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween110("synched",0);
	this.instance_4.setTransform(-437.8,26.15);
	this.instance_4._off = true;

	this.instance_5 = new lib.Tween111("synched",0);
	this.instance_5.setTransform(-437.8,27.85);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(26).to({_off:false},0).to({_off:true,alpha:1},19).wait(347));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(26).to({_off:false},19).to({_off:true,y:27.85},323).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(45).to({_off:false},323).to({alpha:0},23).wait(1));

	// clock
	this.instance_6 = new lib.Tween112("synched",0);
	this.instance_6.setTransform(-437.8,80.15);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween113("synched",0);
	this.instance_7.setTransform(-437.8,80.15);
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween114("synched",0);
	this.instance_8.setTransform(-437.8,80.15);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(81).to({_off:false},0).to({_off:true,alpha:1},19).wait(292));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(81).to({_off:false},19).to({_off:true},268).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(100).to({_off:false},268).to({alpha:0},23).wait(1));

	// ladder
	this.instance_9 = new lib.Tween115("synched",0);
	this.instance_9.setTransform(-437.8,132.85);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.instance_10 = new lib.Tween116("synched",0);
	this.instance_10.setTransform(-437.8,132.85);
	this.instance_10._off = true;

	this.instance_11 = new lib.Tween117("synched",0);
	this.instance_11.setTransform(-437.8,132.85);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(130).to({_off:false},0).to({_off:true,alpha:1},19).wait(243));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(130).to({_off:false},19).to({_off:true},219).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(149).to({_off:false},219).to({alpha:0},23).wait(1));

	// individual
	this.instance_12 = new lib.Tween118("synched",0);
	this.instance_12.setTransform(-427.7,186.75);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.instance_13 = new lib.Tween119("synched",0);
	this.instance_13.setTransform(-427.7,186.75);
	this.instance_13._off = true;

	this.instance_14 = new lib.Tween120("synched",0);
	this.instance_14.setTransform(-427.7,186.75);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(185).to({_off:false},0).to({_off:true,alpha:1},19).wait(188));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(185).to({_off:false},19).to({startPosition:0},30).to({_off:true},134).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(234).to({_off:false},134).to({alpha:0},23).wait(1));

	// who
	this.instance_15 = new lib.Tween121("synched",0);
	this.instance_15.setTransform(200,5.4);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(234).to({_off:false},0).to({alpha:1},40).to({startPosition:0},94).to({alpha:0},23).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-559.1,-105.1,939.1,319.1);


// stage content:
(lib.Scenario2copy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,2,3753,3754,3960,4274,4553,4751,4964,5175,5369,5594,5915,6424,6441,8961];
	this.streamSoundSymbolsList[2] = [{id:"bensoundpianomoment",startFrame:2,endFrame:3754,loop:1,offset:0}];
	this.streamSoundSymbolsList[6441] = [{id:"bensoundpianomoment",startFrame:6441,endFrame:8961,loop:1,offset:268656}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		var _this = this;
		
		_this.Startbutton.on('click', function(){
		
		_this.gotoAndPlay(1);
		});
	}
	this.frame_2 = function() {
		var soundInstance = playSound("bensoundpianomoment",0);
		this.InsertIntoSoundStreamData(soundInstance,2,3754,1);
	}
	this.frame_3753 = function() {
		_this.stop();
		
		_this.gotoAndPlay('3756');
			
		_this.stop();
	}
	this.frame_3754 = function() {
		this.stop();
		
		var _this = this;
		
		_this.Q1.on('click', function(){
		
		_this.gotoAndPlay('3757');
			
		this.stop();
		});
		this.stop();
		
		var _this = this;
		
		_this.Q2.on('click', function(){
		
		_this.gotoAndPlay('3963');
			
		this.stop();
		});
		this.stop();
		
		var _this = this;
		
		_this.Q3.on('click', function(){
		
		_this.gotoAndPlay('4277');
			
		this.stop();
		});
		this.stop();
		
		var _this = this;
		
		_this.Q4.on('click', function(){
		
		_this.gotoAndPlay('4556');
			
		this.stop();
		});
		this.stop();
		
		var _this = this;
		
		_this.Q5.on('click', function(){
		
		_this.gotoAndPlay('4754');
			
		this.stop();
		});
		this.stop();
		
		var _this = this;
		
		_this.Q6.on('click', function(){
		
		_this.gotoAndPlay('4967');
			
		this.stop();
		});
		this.stop();
		
		var _this = this;
		
		_this.Q7.on('click', function(){
		
		_this.gotoAndPlay('5178');
			
		this.stop();
		});
		this.stop();
		
		var _this = this;
		
		_this.Q8.on('click', function(){
		
		_this.gotoAndPlay('5372');
			
		this.stop();
		});
		this.stop();
		
		var _this = this;
		
		_this.Q9.on('click', function(){
		
		_this.gotoAndPlay('5597');
		
			this.stop();
		});
		this.stop();
		
		var _this = this;
		
		_this.Q10.on('click', function(){
		
		_this.gotoAndPlay('5918');
			
		this.stop();
		});
		this.stop();
		
		var _this = this;
		
		_this.ContinueButton.on('click', function(){
		
		_this.gotoAndPlay('6443');
		
		this.stop();
		});
	}
	this.frame_3960 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay('3754');
		this.stop();
	}
	this.frame_4274 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay('3754');
		this.stop();
	}
	this.frame_4553 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay('3754');
		this.stop();
	}
	this.frame_4751 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay('3754');
		this.stop();
	}
	this.frame_4964 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay('3754');
		this.stop();
	}
	this.frame_5175 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay('3754');
		this.stop();
	}
	this.frame_5369 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay('3754');
		this.stop();
	}
	this.frame_5594 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay('3754');
		this.stop();
	}
	this.frame_5915 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay('3754');
		this.stop();
	}
	this.frame_6424 = function() {
		this.stop();
		var _this = this;
		_this.gotoAndPlay('3754');
		this.stop();
	}
	this.frame_6441 = function() {
		var soundInstance = playSound("bensoundpianomoment",0,268656);
		this.InsertIntoSoundStreamData(soundInstance,6441,8961,1,268656);
	}
	this.frame_8961 = function() {
		var _this = this;
		
		_this.gotoAndPlay('1');
		createjs.Sound.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2).call(this.frame_2).wait(3751).call(this.frame_3753).wait(1).call(this.frame_3754).wait(206).call(this.frame_3960).wait(314).call(this.frame_4274).wait(279).call(this.frame_4553).wait(198).call(this.frame_4751).wait(213).call(this.frame_4964).wait(211).call(this.frame_5175).wait(194).call(this.frame_5369).wait(225).call(this.frame_5594).wait(321).call(this.frame_5915).wait(509).call(this.frame_6424).wait(17).call(this.frame_6441).wait(2520).call(this.frame_8961).wait(1));

	// IntroText1
	this.instance = new lib.IntroText1("synched",0);
	this.instance.setTransform(519.85,155.95,1,1,0,0,0,-16,-83.5);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(629).to({_off:false},0).to({alpha:1},14).to({startPosition:0},95).to({alpha:0},10).to({_off:true},1).wait(8213));

	// Introtext2
	this.instance_1 = new lib.IntroText2("synched",0);
	this.instance_1.setTransform(503.85,169.95,1,1,0,0,0,-13,-83.5);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(748).to({_off:false},0).to({alpha:1},9).to({startPosition:0},152).to({alpha:0},7).to({_off:true},1).wait(8045));

	// IntroText3
	this.instance_2 = new lib.IntroText3("synched",0);
	this.instance_2.setTransform(503.85,153.95,1,1,0,0,0,29.5,-58.5);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(916).to({_off:false},0).to({alpha:1},8).to({startPosition:0},148).to({alpha:0},9).to({_off:true},1).wait(7880));

	// IntroText4
	this.instance_3 = new lib.IntroText4("synched",0);
	this.instance_3.setTransform(507.85,157.95,1,1,0,0,0,29.5,-58.5);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1081).to({_off:false},0).to({alpha:1},8).to({startPosition:0},142).to({alpha:0},9).to({_off:true},1).wait(7721));

	// IntroText5
	this.instance_4 = new lib.IntroText5("synched",0);
	this.instance_4.setTransform(519.85,173.95,1,1,0,0,0,32.5,-58.5);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1240).to({_off:false},0).to({alpha:1},9).to({startPosition:0},145).to({alpha:0},8).to({_off:true},1).wait(7559));

	// IntroText6
	this.instance_5 = new lib.IntroText6("synched",0);
	this.instance_5.setTransform(58.95,161.95,0.9,0.9,0,0,0,32.5,-33.5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1402).to({_off:false},0).to({_off:true},190).wait(7370));

	// IntroText7
	this.instance_6 = new lib.IntroText7("synched",0);
	this.instance_6.setTransform(503.85,159.95,1,1,0,0,0,32.5,-79.5);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1592).to({_off:false},0).to({alpha:1},9).to({startPosition:0},132).to({alpha:0},9).to({_off:true},3).wait(7217));

	// JohnSitting
	this.instance_7 = new lib.Patientsitting();
	this.instance_7.setTransform(402,268);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(629).to({_off:false},0).wait(1113).to({_off:true},3).wait(7217));

	// StartButton
	this.Startbutton = new lib.StartButton();
	this.Startbutton.name = "Startbutton";
	this.Startbutton.setTransform(497.75,545.75,0.57,0.57,0,0,0,0,0.1);
	new cjs.ButtonHelper(this.Startbutton, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Startbutton).to({_off:true},1).wait(8961));

	// BrianIntro1
	this.instance_8 = new lib.BrianIntro1("synched",0);
	this.instance_8.setTransform(511.85,171.9,1,1,0,0,0,32.5,-89.2);
	this.instance_8.alpha = 0.1016;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1).to({_off:false},0).to({alpha:1},9).to({startPosition:0},10).to({startPosition:0},95).to({alpha:0},11).to({_off:true},1).wait(8835));

	// BrianIntro2
	this.instance_9 = new lib.BrianIntro2("synched",0);
	this.instance_9.setTransform(515.85,177.9,1,1,0,0,0,32.5,-61.9);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(126).to({_off:false},0).to({alpha:1},9).to({startPosition:0},94).to({alpha:0},10).to({_off:true},1).wait(8722));

	// BrianIntro3
	this.instance_10 = new lib.BrianIntro3("synched",0);
	this.instance_10.setTransform(515.85,195.9,1,1,0,0,0,32.5,-61.9);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(239).to({_off:false},0).to({alpha:1},10).to({startPosition:0},95).to({alpha:0},10).to({_off:true},1).wait(8607));

	// Brianintro4
	this.instance_11 = new lib.BrianIntro4("synched",0);
	this.instance_11.setTransform(565.85,187.9,1,1,0,0,0,32.5,-34.6);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(354).to({_off:false},0).to({alpha:1},10).to({startPosition:0},253).to({alpha:0},12).to({_off:true},1).wait(8332));

	// JohnIntro4
	this.instance_12 = new lib.Tween35("synched",0);
	this.instance_12.setTransform(233.85,470.9,0.9803,0.9804);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.instance_13 = new lib.Tween36("synched",0);
	this.instance_13.setTransform(233.85,470.9,0.9803,0.9804);
	this.instance_13._off = true;

	this.instance_14 = new lib.Tween37("synched",0);
	this.instance_14.setTransform(233.85,470.9,0.9805,0.9803);
	this.instance_14._off = true;

	this.instance_15 = new lib.Tween38("synched",0);
	this.instance_15.setTransform(520.85,468.95,0.9805,0.9804,0,0,0,0.1,0.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_12}]},354).to({state:[{t:this.instance_13}]},10).to({state:[{t:this.instance_14}]},253).to({state:[{t:this.instance_15}]},12).to({state:[]},1).wait(8332));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(354).to({_off:false},0).to({_off:true,alpha:1},10).wait(8598));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(354).to({_off:false},10).to({_off:true,scaleX:0.9805,scaleY:0.9803},253).wait(8345));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(364).to({_off:false},253).to({_off:true,regX:0.1,regY:0.4,scaleY:0.9804,x:520.85,y:468.95},12).wait(8333));

	// BrianNurse
	this.instance_16 = new lib.nurse_brian();
	this.instance_16.setTransform(425,224);

	this.instance_17 = new lib.Tween1("synched",0);
	this.instance_17.setTransform(511,469);
	this.instance_17._off = true;

	this.instance_18 = new lib.Tween2("synched",0);
	this.instance_18.setTransform(511,469);
	this.instance_18.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},343).to({state:[{t:this.instance_18}]},10).to({state:[]},1).wait(8607));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(344).to({_off:false},0).to({_off:true,alpha:0},10).wait(8608));

	// BrianNotes
	this.instance_19 = new lib.BiranNotesV2("synched",0);
	this.instance_19.setTransform(687.6,373.7,1,1,0,0,0,272.6,15);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(380).to({_off:false},0).wait(249).to({startPosition:249},0).to({_off:true},1).wait(8332));

	// SpeechBubble1
	this.instance_20 = new lib.SpeechB1("synched",0);
	this.instance_20.setTransform(265.95,240.5,0.78,0.78,0,0,0,-5.5,5.5);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1762).to({_off:false},0).to({alpha:1},12).to({startPosition:0},85).to({alpha:0},13).to({_off:true},1).wait(7089));

	// SpeechB2
	this.instance_21 = new lib.SpeechB2("synched",0);
	this.instance_21.setTransform(814.6,188.9,0.78,0.78,0,0,0,-5.4,5.7);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1873).to({_off:false},0).to({alpha:1},13).to({startPosition:0},129).to({alpha:0},16).to({_off:true},1).wait(6930));

	// Image2
	this.instance_22 = new lib.Img_Comfort2("synched",0);
	this.instance_22.setTransform(521.75,389.4,1,1,0,0,0,119,56.5);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1873).to({_off:false},0).to({startPosition:0},13).to({startPosition:0},129).to({startPosition:0},16).to({_off:true},1).wait(6930));

	// Image
	this.instance_23 = new lib.Img_Comfort1("synched",0);
	this.instance_23.setTransform(521.75,389.4,1,1,0,0,0,119,56.5);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1745).to({_off:false},0).to({startPosition:0},17).to({startPosition:0},110).to({_off:true},1).wait(7089));

	// Pain1
	this.instance_24 = new lib.Pain1Text("synched",0);
	this.instance_24.setTransform(546.05,125.45,1,1,0,0,0,18.5,-37.2);
	this.instance_24.alpha = 0;
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(2031).to({_off:false},0).to({alpha:1},17).to({startPosition:0},97).to({alpha:0},19).to({_off:true},1).wait(6797));

	// Pain2
	this.instance_25 = new lib.Pain2Text("synched",0);
	this.instance_25.setTransform(534.1,99.9,1,1,0,0,0,27.5,-37.2);
	this.instance_25.alpha = 0;
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(2164).to({_off:false},0).to({alpha:1},19).to({startPosition:0},467).to({alpha:0},18).to({_off:true},1).wait(6293));

	// Pain3
	this.instance_26 = new lib.Tween6("synched",0);
	this.instance_26.setTransform(295.5,399.5);
	this.instance_26.alpha = 0;
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(2211).to({_off:false},0).to({alpha:1},26).to({startPosition:0},178).to({alpha:0},19).to({_off:true},1).wait(6527));

	// Pain4
	this.instance_27 = new lib.Tween7("synched",0);
	this.instance_27.setTransform(292.9,387.5);
	this.instance_27.alpha = 0;
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(2434).to({_off:false},0).to({alpha:1},17).to({startPosition:0},199).to({alpha:0},18).to({_off:true},1).wait(6293));

	// SpeechBubble1
	this.instance_28 = new lib.ThinkB1("synched",0);
	this.instance_28.setTransform(453.05,185.75,0.78,0.78,0,0,0,-5.5,5.5);
	this.instance_28.alpha = 0;
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(2668).to({_off:false},0).to({alpha:1},17).to({startPosition:0},58).to({alpha:0},15).to({_off:true},1).wait(6203));

	// SpeechBubbl2
	this.instance_29 = new lib.ThinkB2("synched",0);
	this.instance_29.setTransform(455.1,193.35,0.78,0.78,0,0,0,-5.5,5.5);
	this.instance_29.alpha = 0;
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(2759).to({_off:false},0).to({alpha:1},15).to({startPosition:0},41).to({alpha:0},13).to({_off:true},1).wait(6133));

	// SpeechBubble3
	this.instance_30 = new lib.ThinkB3("synched",0);
	this.instance_30.setTransform(452.9,185.95,0.78,0.78,0,0,0,-5.5,5.5);
	this.instance_30.alpha = 0;
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(2829).to({_off:false},0).to({alpha:1},13).to({startPosition:0},75).to({alpha:0},19).to({_off:true},1).wait(6025));

	// Text1
	this.instance_31 = new lib.Text1("synched",0);
	this.instance_31.setTransform(570.7,383.65,1,1,0,0,0,4.5,-25.4);
	this.instance_31.alpha = 0;
	this.instance_31._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(2917).to({_off:false},0).to({alpha:1},19).to({startPosition:0},146).to({alpha:0},17).to({_off:true},1).wait(5862));

	// NurseThinking
	this.instance_32 = new lib.nurse_brian_ppe();
	this.instance_32.setTransform(559,221);

	this.instance_33 = new lib.Tween8("synched",0);
	this.instance_33.setTransform(645.5,466);
	this.instance_33._off = true;

	this.instance_34 = new lib.Tween9("synched",0);
	this.instance_34.setTransform(645.5,466);
	this.instance_34.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_32}]},2015).to({state:[{t:this.instance_33}]},1085).to({state:[{t:this.instance_34}]},16).to({state:[]},1).wait(5845));
	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(3100).to({_off:false},0).to({_off:true,alpha:0},16).wait(5846));

	// Questions_1
	this.Q1 = new lib.Q1();
	this.Q1.name = "Q1";
	this.Q1.setTransform(251.2,91.45);
	this.Q1._off = true;
	new cjs.ButtonHelper(this.Q1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Q1).wait(3754).to({_off:false},0).to({_off:true},1).wait(5207));

	// Questions_2
	this.Q2 = new lib.Q2();
	this.Q2.name = "Q2";
	this.Q2.setTransform(450.1,91.7);
	this.Q2._off = true;
	new cjs.ButtonHelper(this.Q2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Q2).wait(3754).to({_off:false},0).to({_off:true},1).wait(5207));

	// Questions_3
	this.Q3 = new lib.Q3();
	this.Q3.name = "Q3";
	this.Q3.setTransform(644.95,91.7);
	this.Q3._off = true;
	new cjs.ButtonHelper(this.Q3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Q3).wait(3754).to({_off:false},0).to({_off:true},1).wait(5207));

	// Questions_4
	this.Q4 = new lib.Q4();
	this.Q4.name = "Q4";
	this.Q4.setTransform(842.8,92.15);
	this.Q4._off = true;
	new cjs.ButtonHelper(this.Q4, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Q4).wait(3754).to({_off:false},0).to({_off:true},1).wait(5207));

	// Questions_5
	this.Q5 = new lib.Q5();
	this.Q5.name = "Q5";
	this.Q5.setTransform(1046.75,90.65);
	this.Q5._off = true;
	new cjs.ButtonHelper(this.Q5, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Q5).wait(3754).to({_off:false},0).to({_off:true},1).wait(5207));

	// Questions_6
	this.Q6 = new lib.Q6();
	this.Q6.name = "Q6";
	this.Q6.setTransform(251,176.6);
	this.Q6._off = true;
	new cjs.ButtonHelper(this.Q6, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Q6).wait(3754).to({_off:false},0).to({_off:true},1).wait(5207));

	// Questions_7
	this.Q7 = new lib.Q7();
	this.Q7.name = "Q7";
	this.Q7.setTransform(450.95,176.6);
	this.Q7._off = true;
	new cjs.ButtonHelper(this.Q7, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Q7).wait(3754).to({_off:false},0).to({_off:true},1).wait(5207));

	// Questions_8
	this.Q8 = new lib.Q8();
	this.Q8.name = "Q8";
	this.Q8.setTransform(646.85,176.6);
	this.Q8._off = true;
	new cjs.ButtonHelper(this.Q8, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Q8).wait(3754).to({_off:false},0).to({_off:true},1).wait(5207));

	// Questions_9
	this.Q9 = new lib.Q9();
	this.Q9.name = "Q9";
	this.Q9.setTransform(842.8,176.6);
	this.Q9._off = true;
	new cjs.ButtonHelper(this.Q9, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Q9).wait(3754).to({_off:false},0).to({_off:true},1).wait(5207));

	// Questions_10
	this.Q10 = new lib.Q10();
	this.Q10.name = "Q10";
	this.Q10.setTransform(1048.7,178.3);
	this.Q10._off = true;
	new cjs.ButtonHelper(this.Q10, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.Q10).wait(3754).to({_off:false},0).to({_off:true},1).wait(5207));

	// ContinueButton
	this.ContinueButton = new lib.ContinueButton();
	this.ContinueButton.name = "ContinueButton";
	this.ContinueButton.setTransform(1049.75,756.3);
	this.ContinueButton._off = true;
	new cjs.ButtonHelper(this.ContinueButton, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.ContinueButton).wait(3754).to({_off:false},0).to({_off:true},1).wait(5207));

	// Q10
	this.instance_35 = new lib.Q10Nurse("synched",0);
	this.instance_35.setTransform(475.95,215.4,0.8,0.8,0,0,0,-11,38.2);
	this.instance_35.alpha = 0;
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(5916).to({_off:false},0).to({alpha:1},15).to({startPosition:0},175).to({alpha:0},15).to({startPosition:0},154).to({_off:true},1).wait(2686));

	// Response10_1
	this.instance_36 = new lib.Q10Patient1("synched",0);
	this.instance_36.setTransform(525.95,210.25,0.8,0.8,0,0,0,-1.9,-4.3);
	this.instance_36.alpha = 0;
	this.instance_36._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(6121).to({_off:false},0).to({alpha:1},13).to({startPosition:0},61).to({alpha:0},12).to({_off:true},1).wait(2754));

	// QuestionP2
	this.instance_37 = new lib.Q10Nurse3("synched",0);
	this.instance_37.setTransform(509.4,219.25,0.66,0.66,0,0,0,-13.3,37.6);
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(6207).to({_off:false},0).to({_off:true},185).wait(2570));

	// Response10_2
	this.instance_38 = new lib.Q10Patient2("synched",0);
	this.instance_38.setTransform(531.85,246.1,0.8,0.8,0,0,0,-2.3,42.2);
	this.instance_38.alpha = 0;
	this.instance_38._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(6391).to({_off:false},0).to({alpha:1},12).to({startPosition:0},21).to({_off:true},1).wait(2537));

	// Q9
	this.instance_39 = new lib.Q9Nurse("synched",0);
	this.instance_39.setTransform(481.3,225.2,0.8,0.8,0,0,0,-11,43.2);
	this.instance_39.alpha = 0;
	this.instance_39._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(5595).to({_off:false},0).to({alpha:1},13).to({startPosition:0},105).to({alpha:0},13).to({_off:true},1).wait(3235));

	// Respone9_1
	this.instance_40 = new lib.Q9Patient1("synched",0);
	this.instance_40.setTransform(510.6,238.9,0.8,0.8,0,0,0,-1.4,-2.2);
	this.instance_40.alpha = 0;
	this.instance_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(5726).to({_off:false},0).to({alpha:1},12).to({startPosition:0},88).to({alpha:0},16).to({_off:true},74).wait(3046));

	// Response9_2
	this.instance_41 = new lib.Q9Patient2("synched",0);
	this.instance_41.setTransform(511.4,240.75,0.8,0.8,0,0,0,-1.2,1.7);
	this.instance_41.alpha = 0;
	this.instance_41._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(5826).to({_off:false},0).to({alpha:1},16).to({startPosition:0},73).to({_off:true},1).wait(3046));

	// Q8
	this.instance_42 = new lib.Q8Nurse("synched",0);
	this.instance_42.setTransform(468.5,206.15,0.8,0.8,0,0,0,-10.7,26.2);
	this.instance_42.alpha = 0;
	this.instance_42._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(5370).to({_off:false},0).to({alpha:1},17).to({startPosition:0},123).to({alpha:0},13).to({_off:true},1).wait(3438));

	// Response8
	this.instance_43 = new lib.Q8Patient1("synched",0);
	this.instance_43.setTransform(512.9,238.6,0.8,0.8,0,0,0,-1.5,-1.7);
	this.instance_43.alpha = 0;
	this.instance_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(5523).to({_off:false},0).to({alpha:1},14).to({startPosition:0},57).to({_off:true},1).wait(3367));

	// Q7
	this.instance_44 = new lib.Q7Nurse("synched",0);
	this.instance_44.setTransform(496.85,213.7,0.8,0.8,0,0,0,-11,21.4);
	this.instance_44.alpha = 0;
	this.instance_44._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(5176).to({_off:false},0).to({alpha:1},15).to({startPosition:0},101).to({alpha:0},16).to({_off:true},1).wait(3653));

	// Response7
	this.instance_45 = new lib.Q7Patient1("synched",0);
	this.instance_45.setTransform(508.85,232.9,0.8,0.8,0,0,0,-1.4,-8.2);
	this.instance_45.alpha = 0;
	this.instance_45._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(5308).to({_off:false},0).to({alpha:1},13).to({startPosition:0},48).to({_off:true},1).wait(3592));

	// Q6
	this.instance_46 = new lib.Q6Nurse("synched",0);
	this.instance_46.setTransform(508.25,209.9,0.8,0.8,0,0,0,-11,7);
	this.instance_46.alpha = 0;
	this.instance_46._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(4965).to({_off:false},0).to({alpha:1},12).to({startPosition:0},104).to({alpha:0},14).to({_off:true},1).wait(3866));

	// Response6
	this.instance_47 = new lib.Q6Patient1("synched",0);
	this.instance_47.setTransform(507.25,233.05,0.8,0.8,0,0,0,-1.5,3.9);
	this.instance_47.alpha = 0;
	this.instance_47._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(5095).to({_off:false},0).to({alpha:1},14).to({startPosition:0},66).to({_off:true},1).wait(3786));

	// Q5
	this.instance_48 = new lib.Q5Nurse("synched",0);
	this.instance_48.setTransform(499.15,215.35,0.8,0.8,0,0,0,-10.9,20.4);
	this.instance_48._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(4752).to({_off:false},0).to({startPosition:0},13).to({startPosition:0},115).to({alpha:0},15).to({_off:true},1).wait(4066));

	// Response5
	this.instance_49 = new lib.Q5Patient1("synched",0);
	this.instance_49.setTransform(518.4,229.2,0.8,0.8,0,0,0,-1.5,11.6);
	this.instance_49.alpha = 0;
	this.instance_49._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(4895).to({_off:false},0).to({alpha:1},12).to({startPosition:0},57).to({_off:true},1).wait(3997));

	// Q4
	this.instance_50 = new lib.Q4Nurse("synched",0);
	this.instance_50.setTransform(489.55,161.95,0.8,0.8,0,0,0,-11,-24.2);
	this.instance_50.alpha = 0;
	this.instance_50._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(4554).to({_off:false},0).to({alpha:1},12).to({startPosition:0},115).to({alpha:0},14).to({_off:true},1).wait(4266));

	// Response4
	this.instance_51 = new lib.Q4Patient1("synched",0);
	this.instance_51.setTransform(524.25,213.8,0.8,0.8,0,0,0,-1.5,-7.5);
	this.instance_51.alpha = 0;
	this.instance_51._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(4695).to({_off:false},0).to({alpha:1},13).to({startPosition:0},43).to({_off:true},1).wait(4210));

	// Q3
	this.instance_52 = new lib.Q3Nurse("synched",0);
	this.instance_52.setTransform(489.55,177.45,0.8,0.8,0,0,0,-10.9,-24.1);
	this.instance_52.alpha = 0;
	this.instance_52._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(4275).to({_off:false},0).to({alpha:1},13).to({startPosition:0},162).to({alpha:0},14).to({_off:true},1).wait(4497));

	// Response3
	this.instance_53 = new lib.Q3Patient1("synched",0);
	this.instance_53.setTransform(517.3,228,0.8,0.8,0,0,0,-1.5,-1.9);
	this.instance_53.alpha = 0;
	this.instance_53._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(4464).to({_off:false},0).to({alpha:1},17).to({startPosition:0},72).to({_off:true},1).wait(4408));

	// Q2
	this.instance_54 = new lib.Q2Nurse("synched",0);
	this.instance_54.setTransform(496.1,195.85,0.8,0.8,0,0,0,-10.9,-11);
	this.instance_54.alpha = 0;
	this.instance_54._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(3961).to({_off:false},0).to({alpha:1},15).to({startPosition:0},180).to({alpha:0},13).to({_off:true},1).wait(4792));

	// Response2
	this.instance_55 = new lib.Q2Patient1("synched",0);
	this.instance_55.setTransform(518.5,223.3,0.8,0.8,0,0,0,-1.5,-10.5);
	this.instance_55.alpha = 0;
	this.instance_55._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(4169).to({_off:false},0).to({alpha:1},14).to({startPosition:0},91).to({_off:true},1).wait(4687));

	// Response1
	this.instance_56 = new lib.Q1Patient1("synched",0);
	this.instance_56.setTransform(503.2,242.45,0.75,0.75,0,0,0,-1.4,-10.5);
	this.instance_56.alpha = 0;
	this.instance_56._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(3870).to({_off:false},0).to({alpha:1},13).to({startPosition:0},77).to({_off:true},1).wait(5001));

	// Q1
	this.instance_57 = new lib.Q1Nurse("synched",0);
	this.instance_57.setTransform(547.85,215.95,0.75,0.75,0,0,0,-1.4,-10.5);
	this.instance_57.alpha = 0;
	this.instance_57._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(3755).to({_off:false},0).to({alpha:1},18).to({startPosition:0},82).to({alpha:0},15).to({_off:true},1).wait(5091));

	// Diagram
	this.instance_58 = new lib.Tween16("synched",0);
	this.instance_58.setTransform(205.5,551.5);
	this.instance_58.alpha = 0;
	this.instance_58._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(3146).to({_off:false},0).to({alpha:1},14).to({startPosition:0},83).to({alpha:0},16).to({_off:true},1).wait(5702));

	// Text3
	this.instance_59 = new lib.Text3("synched",0);
	this.instance_59.setTransform(542.35,657.85,1,1,0,0,0,-133.5,-42.2);
	this.instance_59.alpha = 0;
	this.instance_59._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(3259).to({_off:false},0).to({alpha:1},14).to({startPosition:0},158).to({alpha:0},15).to({_off:true},1).wait(5515));

	// Text4
	this.instance_60 = new lib.Text4("synched",0);
	this.instance_60.setTransform(559.25,670.1,1,1,0,0,0,1,-20.9);
	this.instance_60.alpha = 0;
	this.instance_60._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(3431).to({_off:false},0).to({alpha:1},15).to({startPosition:0},185).to({alpha:0},15).to({_off:true},1).wait(5315));

	// SpeechBubble1
	this.instance_61 = new lib.SpeechB3("synched",0);
	this.instance_61.setTransform(508.95,181.7,1,1,0,0,0,-5.5,5.5);
	this.instance_61.alpha = 0;
	this.instance_61._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(3646).to({_off:false},0).to({alpha:1},16).to({startPosition:0},77).to({alpha:0},14).to({_off:true},1).wait(5208));

	// Patient
	this.instance_62 = new lib.Tween10("synched",0);
	this.instance_62.setTransform(397.25,483.85);
	this.instance_62.alpha = 0;
	this.instance_62._off = true;

	this.instance_63 = new lib.Tween11("synched",0);
	this.instance_63.setTransform(397.25,483.85);
	this.instance_63._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(3100).to({_off:false},0).to({_off:true,alpha:1},16).wait(5846));
	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(3100).to({_off:false},16).to({startPosition:0},3308).to({alpha:0},17).to({_off:true},1).wait(2520));

	// Text2
	this.instance_64 = new lib.Text2("synched",0);
	this.instance_64.setTransform(535.85,115.9,1,1,0,0,0,-22,-76);
	this.instance_64.alpha = 0;
	this.instance_64._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(3116).to({_off:false},0).to({alpha:1},17).to({startPosition:0},498).to({alpha:0},15).to({_off:true},1).wait(5315));

	// NurseSitting
	this.instance_65 = new lib.Tween12("synched",0);
	this.instance_65.setTransform(672.55,485.45);
	this.instance_65.alpha = 0;
	this.instance_65._off = true;

	this.instance_66 = new lib.Tween13("synched",0);
	this.instance_66.setTransform(672.55,485.45);
	this.instance_66._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(3100).to({_off:false},0).to({_off:true,alpha:1},16).wait(5846));
	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(3100).to({_off:false},16).to({startPosition:0},639).to({startPosition:0},2669).to({alpha:0},17).to({_off:true},1).wait(2520));

	// TextReflect1
	this.instance_67 = new lib.TextReflect1("synched",0);
	this.instance_67.setTransform(529.85,106.35,1,1,0,0,0,25.5,-8);
	this.instance_67.alpha = 0;
	this.instance_67._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(6441).to({_off:false},0).to({alpha:1},16).to({startPosition:0},79).to({alpha:0},13).to({_off:true},1).wait(2412));

	// TextReflect2_copy
	this.instance_68 = new lib.TextReflect2("synched",0);
	this.instance_68.setTransform(525.8,130.4,1,1,0,0,0,32,16.7);
	this.instance_68.alpha = 0;
	this.instance_68._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(6561).to({_off:false},0).to({alpha:1},12).to({startPosition:0},154).to({alpha:0},15).to({_off:true},1).wait(2219));

	// Textreflect3
	this.instance_69 = new lib.TextReflect3("synched",0);
	this.instance_69.setTransform(530.55,141.35,1,1,0,0,0,30,-15.6);
	this.instance_69._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(6742).to({_off:false},0).wait(281).to({y:98.3,startPosition:281},0).to({_off:true},1).wait(1938));

	// TextReflect4
	this.instance_70 = new lib.TextReflect4("synched",0);
	this.instance_70.setTransform(520.4,146.85,1,1,0,0,0,46,-5.9);
	this.instance_70._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(7023).to({_off:false},0).to({_off:true},369).wait(1570));

	// graphpysch
	this.instance_71 = new lib.Tween138("synched",0);
	this.instance_71.setTransform(289.5,395.5);
	this.instance_71.alpha = 0;
	this.instance_71._off = true;

	this.instance_72 = new lib.Tween139("synched",0);
	this.instance_72.setTransform(289.5,395.5);
	this.instance_72._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(7023).to({_off:false},0).to({_off:true,alpha:1},19).wait(1920));
	this.timeline.addTween(cjs.Tween.get(this.instance_72).wait(7023).to({_off:false},19).to({startPosition:0},135).to({alpha:0},16).to({_off:true},1).wait(1768));

	// graphspirit
	this.instance_73 = new lib.Tween136("synched",0);
	this.instance_73.setTransform(289.5,395.5);
	this.instance_73.alpha = 0;
	this.instance_73._off = true;

	this.instance_74 = new lib.Tween137("synched",0);
	this.instance_74.setTransform(289.5,395.5);
	this.instance_74._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_73).wait(6742).to({_off:false},0).to({_off:true,alpha:1},17).wait(2203));
	this.timeline.addTween(cjs.Tween.get(this.instance_74).wait(6742).to({_off:false},17).to({startPosition:0},264).to({alpha:0},19).to({_off:true},1).wait(1919));

	// graphsocial
	this.instance_75 = new lib.Tween134("synched",0);
	this.instance_75.setTransform(289.5,395.5);
	this.instance_75.alpha = 0;
	this.instance_75._off = true;

	this.instance_76 = new lib.Tween135("synched",0);
	this.instance_76.setTransform(289.5,395.5);
	this.instance_76._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_75).wait(6561).to({_off:false},0).to({_off:true,alpha:1},12).wait(2389));
	this.timeline.addTween(cjs.Tween.get(this.instance_76).wait(6561).to({_off:false},12).to({startPosition:0},169).to({alpha:0},17).to({_off:true},1).wait(2202));

	// Graph
	this.instance_77 = new lib.Tween18("synched",0);
	this.instance_77.setTransform(289.5,395.5);
	this.instance_77.alpha = 0;
	this.instance_77._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_77).wait(6499).to({_off:false},0).to({alpha:1},13).to({startPosition:0},49).to({alpha:0},12).to({startPosition:0},604).to({alpha:1},16).to({startPosition:0},179).to({alpha:0},19).to({_off:true},1).wait(1570));

	// NusreStanding1
	this.instance_78 = new lib.Tween17("synched",0);
	this.instance_78.setTransform(631.5,463);
	this.instance_78.alpha = 0;
	this.instance_78._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(6441).to({_off:false},0).to({alpha:1},16).to({startPosition:0},961).to({alpha:0},19).to({_off:true},1).wait(1524));

	// SBPerceptor
	this.instance_79 = new lib.SpeechPreceptor("synched",0);
	this.instance_79.setTransform(480.85,161.25,1,1,0,0,0,-7.9,-17.2);
	this.instance_79._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(7437).to({_off:false},0).to({_off:true},337).wait(1188));

	// Layer_5
	this.instance_80 = new lib.pain("synched",0);
	this.instance_80.setTransform(526.3,659.9,1,1,0,0,0,-10.5,17.2);
	this.instance_80._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_80).wait(7774).to({_off:false},0).to({_off:true},203).wait(985));

	// Layer_6
	this.instance_81 = new lib.Analgesia("synched",0);
	this.instance_81.setTransform(580.95,258.25,1,1,0,0,0,-17.9,126.8);
	this.instance_81._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(7977).to({_off:false},0).to({_off:true},393).wait(592));

	// Layer_7
	this.instance_82 = new lib.PainTogether("synched",0);
	this.instance_82.setTransform(514.4,75.05,1,1,0,0,0,20,-152.8);
	this.instance_82._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_82).wait(8370).to({_off:false},0).wait(502).to({startPosition:0},0).to({_off:true},1).wait(89));

	// Nurse2
	this.instance_83 = new lib.Tween92("synched",0);
	this.instance_83.setTransform(672.6,485.55,1.19,1.19,0,0,0,0.1,0.1);
	this.instance_83.alpha = 0;
	this.instance_83._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_83).wait(7418).to({_off:false},0).to({alpha:1},19).to({scaleY:1.1899},1422).to({scaleY:1.19,alpha:0},13).to({_off:true},1).wait(89));

	// Patient1
	this.instance_84 = new lib.Tween91("synched",0);
	this.instance_84.setTransform(397.35,485.55,1.0342,1.148,0,0,0,0.1,0.1);
	this.instance_84.alpha = 0;
	this.instance_84._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(7418).to({_off:false},0).to({alpha:1},19).to({scaleX:1.0341,scaleY:1.1479},1422).to({scaleX:1.0342,alpha:0},13).to({_off:true},1).wait(89));

	// Layer_1
	this.instance_85 = new lib.BrianDiscuss("synched",0);
	this.instance_85.setTransform(530.8,123.05,1,1,0,0,0,68,-119.8);
	this.instance_85.alpha = 0;
	this.instance_85._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_85).wait(8872).to({_off:false},0).to({alpha:1},17).to({startPosition:0},72).wait(1));

	// Layer_8
	this.instance_86 = new lib.Layer8("synched",0);
	this.instance_86.setTransform(513.5,384,1,1,0,0,0,93.5,-74);
	this.instance_86.alpha = 0;
	this.instance_86._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_86).wait(8859).to({_off:false},0).to({alpha:1},13).to({startPosition:0},89).wait(1));

	// Background1
	this.instance_87 = new lib.Tween5("synched",0);
	this.instance_87.setTransform(524,390.5);
	this.instance_87._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_87).wait(2015).to({_off:false},0).to({startPosition:0},1739).to({startPosition:0},2687).to({startPosition:0},2418).to({alpha:0},13).to({_off:true},1).wait(89));

	// Background
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#438A8F").s().p("EhQHA8UMAAAh4nMCgPAAAMAAAB4ng");
	this.shape.setTransform(512.85,384.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#52A9AF").s().p("EhQHA8UMAAAh4nMCgPAAAMAAAB4ng");
	this.shape_1.setTransform(512.85,384.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1871).to({state:[{t:this.shape_1}]},1227).to({state:[]},1).wait(5862));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(408.8,310.9,740.2,542.1);
// library properties:
lib.properties = {
	id: 'EF0F643132DCB34898574E8C00FEEBA9',
	width: 1024,
	height: 768,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/scenario2_atlas_1.png", id:"scenario2_atlas_1"},
		{src:"images/scenario2_atlas_2.png", id:"scenario2_atlas_2"},
		{src:"sounds/bensoundpianomoment.mp3", id:"bensoundpianomoment"}
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
an.compositions['EF0F643132DCB34898574E8C00FEEBA9'] = {
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