
export default function formatSalary(num) {

  if(num > 999 && num < 1000000){
  	const val = parseInt((num/1000).toFixed(1))
    return val + 'k';
  } else if(num > 1000000){
     return (num/1000000).toFixed(1) + 'm';

  } else if(num < 900){
     return num;
  }

}