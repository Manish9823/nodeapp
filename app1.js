
console.log("Hello");

let a=8;

for(let i=1;i<=a;i++){
	let result=i*a;
	console.log( a + " x " + i + " = " + result);
}

let arr= [12,43,22,64,78,89,222,23,1];

//print array without sorting

console.log("Array without sorting");

for(let i=0;i<arr.length;i++){
	console.log(arr[i]);
}

//sorting Number

console.log("Array with Ascending Order");

for(let i=0;i<arr.length;i++){
	for(let j=0;j<arr.length;j++){
		if(arr[i]<arr[j]){
			let temp=arr[i];
			arr[i]=arr[j];
			arr[j]=temp;
		}	
	}
}
//printing ascending sorted number 
for(let i=0;i<arr.length;i++){
	console.log(arr[i]);
}


console.log("Array with Descending Order");

for(let i=0;i<arr.length;i++){
	for(let j=0;j<arr.length;j++){
		if(arr[i]>arr[j]){
			let temp=arr[i];
			arr[i]=arr[j];
			arr[j]=temp;
		}	
	}
}

//printing descending sorted number
for(let i=0;i<arr.length;i++){
	console.log(arr[i]);
}

