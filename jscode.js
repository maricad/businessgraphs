var inch = 2.54;
var scalex = 50;
var scaley = 26; 
function getTimestamp() {
	var dateNow = new Date();
	var dateMM = dateNow.getMonth() + 1; dateDD = dateNow.getDate(); dateYY = dateNow.getFullYear(), h = dateNow.getHours(); m = dateNow.getMinutes();
	return dateNow.getFullYear() +''+ (dateMM<=9 ? '0' + dateMM : dateMM) +''+ (dateDD<=9 ? '0' + dateDD : dateDD) + (h<=9 ? '0' + h : h) + (m<=9 ? '0' + m : m);
}
debugger;

var sMarimekko = window.e_jsonm.getDoc().getValue();
var marimekko = JSON.parse(sMarimekko);
var pptx = new PptxGenJS();
pptx.setLayout({ name:'A4', width:(27.517/inch), height:(19.05/inch)});
var optsTitle = { color:'9F9F9F', marginPt:3, border:[0,0,{pt:'1',color:'CFCFCF'},0] };
var slide = pptx.addNewSlide();
var stemp = marimekko.title.replace(/{{ratio_thresold}}/,marimekko.ratio_threshold);
var ratio = 1;
switch(marimekko.display)
    {
  		case "Bn":
    		switch(marimekko.internal)
                {
              		case "Mn":
                		ratio = 1000;
                		break;
              		case "Kn":
                		ratio = 1000000;
                		break;
              		case "Un":
                		ratio = 1000000000;
                		break;
                }
    		break;
    }
stemp = stemp.replace(/{{size}}/,Math.round((marimekko.size/ratio)*100)/100);
stemp = stemp.replace(/{{currency}}/,marimekko.currency);
stemp = stemp.replace(/{{display}}/,marimekko.display);
slide.addTable( [ [{ text:stemp, options:optsTitle }] ], { x:(1/inch), y:(1/inch), w:(20/inch) } );

for(var rows=0; rows<marimekko.rows.length; rows++){
  slide.addText(marimekko.rows[rows].title, { shape:pptx.shapes.RECTANGLE, 
                                             x:marimekko.rows[rows].box.Left/scalex/inch, 
                                             y:marimekko.rows[rows].box.Top/scaley/inch, 
                                             w:marimekko.rows[rows].box.Width/scalex/inch, 
                                             h:marimekko.rows[rows].box.Height/scaley/inch,
                                             fill:'FFFFFF',
											 line: '5B9BD5',
                                             align:'c',
                                             font_size:8 });
}

pptx.save('Marimekko'+'_'+getTimestamp());