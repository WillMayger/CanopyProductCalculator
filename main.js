//creating array and total cost
var gProducts = [],
	bpArray = [],
	gTotalCost = 0;


//NAMES AND COSTS FOR BLUEPRINTS
var blueprints =
{
	'Blueprints:':0,
	'Blue Print One': 100,
	'Blue Print Two': 200,
	'Blue Print Three':300
};
var bpInfo = {
     0:'Blueprints:',
	 1:'Blueprint one \n cost: 100 \n IP 3 \n Disk 4',
	 2:'Blueprint two \n cost: 200 \n IP 3 \n Disk 4',
	 3:'Blueprint three \n cost: 300 \n IP 3 \n Disk 4'
	 

};
// Adds blueprint objects to bpArray
function addProductBp (name, cost)
{
	var productBp = 
		{
		name: name,
		cost: cost,
		 
		}
   bpArray.push(productBp); 
   renderProducts();
}

	
//NAMES FOR PRODUCTS
var names =
{
	 //Additional components 
     Processor:"Processor (per vCPU)",
	 Memory:"Memory (per GB)",
	 Disk:"Disk (per 10GB)",
	 IP:"Public IP Address (per IP)",
	 Bandwidth:"Internet Bandwidth (per GB)",
	 
	 //( Virtual private Cloud Subscription)
	 VPCS:"Virtual private cloud"
};

// COSTS FOR PRODUCTS
var costs =
{
	 //Additional components
	 Processor:19,
     Memory:22,
     Disk:2,
     IP:7,
	 Bandwidth:0.14,
	
	 //( Virtual private Cloud Subscription)
	 VPC:1371.00.toFixed(2)
};

// Adding Products to array gProducts
function addProduct (name, cost)
{
     var product = {
         name: name,
         cost: cost
     }
     gProducts.push(product);
     gTotalCost += Number(cost);
     renderProducts();
}

 window.onload = function bpOnLoad()
 {
 
	 for (var b in blueprints) {
		addProductBp(b,blueprints[b])
		
	 }
	
     var select = document.getElementById("Blueprints");
	 
	 for(var i = 0; i < Object.keys(bpArray).length; ++i)
	 {
		var option = document.createElement('option');
		option.text  =  bpArray[i].name;
		option.value  =  bpArray[i].cost;
		option.title  =  bpInfo[i];
		
	 select.add(option);
	 }
};

//Getting name and cost from value of blue prints, adding to array and rendering producs
function bluePRTfunc()
{
	 selectedBp = document.getElementById("Blueprints");
	 var bPText = selectedBp.options[selectedBp.selectedIndex].text;
	 var bPValue = selectedBp.options[selectedBp.selectedIndex].value;
	 addProduct(bPText, bPValue);
	 renderProducts();
	 
	 totalCostFunc();
}

//Getting products from array, use of for in loop setting new table rows in blank var for each array item
 var index = 0;
function renderProducts()
{
	 var i, row, cell, span;  
	 var table = document.getElementById('tableRow');
	 for (i = index; i < gProducts.length; i++) {
	 
		if( gProducts[i].cost > 0){
	 
	         row = table.insertRow(-1);
			 row.id = 'tableRow00'  + index;
             cell = row.insertCell(-1);
             cell.className = 'pure-table pure-tab{le-horizontal'; 
			 
             cell.id = 'tableRow' + index;
			 span = document.createElement('span');
			 span.id = 'tableRowSpans00' + index;
			 span.appendChild(document.createTextNode(gProducts[i].name));
             cell.appendChild(span);
			 
             cell = row.insertCell(-1);
             cell.className = 'pure-table pure-table-horizontal';
			 cell.id = 'tableRow' + index;
             cell.innerHTML = '€';
             span = document.createElement('span');
             span.id = 'tableRowSpans00' + index;
             span.appendChild(document.createTextNode(gProducts[i].cost));
             cell.appendChild(span);
			 
			 cell = row.insertCell(-1);
             cell.className = 'pure-table pure-table-horizontal';
			 cell.onload = 'deleteCheckBoxTick()';
			 cell.id = 'tableRow' + index;
             cell.innerHTML = '<input type="button" value="X" class="pure-button pure-button-primary" id="deleteRowBtn" onclick="deleteRow(this)">';
             
		}
		else{}
	}
	 index = i;
}

function deleteRow(r){
	 
	 var e = r.parentNode.parentNode.rowIndex;
	
	 var subtractCost = r.parentNode.parentNode.childNodes[1].childNodes[1].innerHTML;
	 var subtractName = r.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML;
    gTotalCost = gTotalCost - subtractCost;
	 document.getElementById("tableFull").deleteRow(e);
		 
		 
		console.log(gTotalCost);
		if(subtractName === names.VPCS) {
		 document.getElementById("VPCSubscription").checked = false;
		 } 
	

		var gTotalCostWithDecimalRemove = gTotalCost.toFixed(2);
	 var newHTML =   "<div id='totalCostDivFinal'><b> Total cost: € "+ gTotalCostWithDecimalRemove +"</b> </div> "

	 document.getElementById('totalCostAddHtmlDiv').innerHTML = newHTML;

		 if(gTotalCost === 0) {

			var newHTML =  "<div class='totalCostDivFinal'></div> "

			document.getElementById('totalCostAddHtmlDiv').innerHTML = newHTML;
		 } 
		  for (var n in names) {
		  if(subtractName === names[n]){
		  
		  var valueBeingUsed = document.getElementById(n);
		  if (valueBeingUsed != null){
		  valueBeingUsed.value = 0;
		  }
		}
		}
}



//Getting values from additional input box's, then adding name and cost objects to array
function additionalFunc(u)
{	
	 var thisID = u.id;
	 var costsSelected = document.getElementById(thisID).value;  
	 var CostsPre = costsSelected * costs[thisID];
	
	 var Costs = CostsPre.toFixed(2);
	 
	 var t = document.getElementById('tableFull');
		 
         for (var i = 1, row; row = t.rows[i]; i++) {
		 
			var tee = t.childNodes[3].childNodes[i].rowIndex;

			var subtractCost = t.childNodes[3].childNodes[i].childNodes[1].childNodes[1].innerHTML;
			var subtractName = t.childNodes[3].childNodes[i].childNodes[0].childNodes[0].innerHTML;
			if(subtractName === names[thisID]){
			
	
					document.getElementById("tableFull").deleteRow(tee);
				
					 gTotalCost = gTotalCost - subtractCost;
					 renderProducts();		
				
		
			}
		}
	 
	 addProduct(names[thisID],Costs);
	totalCostFunc();
	
}

//seeing wether checkbox has been ticked and then  adding name and cost objects to array

function VPCcheckboxFunc()
{
var VPCSubscriptionUser = document.getElementById("VPCSubscription").checked;
	
		if (VPCSubscriptionUser === true)
		{
			addProduct(names.VPCS,costs.VPC);
			
			renderProducts()
		}
		
		else 
		{
		
		}
var t = document.getElementById('tableFull');
		 
         for (var i = 1, row; row = t.rows[i]; i++) {
			
			var te = t.childNodes[3].childNodes[i].rowIndex;
			
			var subtractCost = t.childNodes[3].childNodes[i].childNodes[1].childNodes[1].innerHTML;
			var subtractName = t.childNodes[3].childNodes[i].childNodes[0].childNodes[0].innerHTML;
			if(subtractName === names.VPCS) {
			   
				if (document.getElementById("VPCSubscription").checked === false){
				document.getElementById("tableFull").deleteRow(te);
				
				 gTotalCost = gTotalCost - subtractCost;
		        
		
				}
			} 
			else {
			}
		 }
	totalCostFunc();
}
		

//Setting total cost to table.
function totalCostFunc()
{ 

		var gTotalCostWithDecimal = gTotalCost.toFixed(2);
		
 var t = document.getElementById('tableFull');
	for (var i = 0, row; row = t.rows[i]; i++) {	
		
	
		 if(i === 0) {
			var newHTML =  "<div class='totalCostDivFinal'></div> "
		
			document.getElementById('totalCostAddHtmlDiv').innerHTML = newHTML;
			 
		} else {
		
		var newHTML =  "<div id='totalCostDivFinal'><b> Total cost: € "+ gTotalCostWithDecimal +"</b> </div> "
		
		document.getElementById('totalCostAddHtmlDiv').innerHTML = newHTML;
	}
}
}
