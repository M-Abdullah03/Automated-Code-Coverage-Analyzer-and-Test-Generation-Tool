function cov_24n15z917s(){var path="main.js";var hash="d02aaa346e13ba7bc16894a5ea172f0d191a50e0";var global=new Function("return this")();var gcv="__coverage__";var coverageData={path:"main.js",statementMap:{"0":{start:{line:4,column:4},end:{line:18,column:5}},"1":{start:{line:5,column:8},end:{line:10,column:9}},"2":{start:{line:6,column:12},end:{line:8,column:13}},"3":{start:{line:7,column:16},end:{line:7,column:28}},"4":{start:{line:9,column:12},end:{line:9,column:24}},"5":{start:{line:11,column:8},end:{line:11,column:20}},"6":{start:{line:13,column:9},end:{line:18,column:5}},"7":{start:{line:14,column:8},end:{line:14,column:20}},"8":{start:{line:17,column:8},end:{line:17,column:21}},"9":{start:{line:23,column:0},end:{line:23,column:24}}},fnMap:{"0":{name:"testConditions",decl:{start:{line:2,column:9},end:{line:2,column:23}},loc:{start:{line:2,column:33},end:{line:19,column:1}},line:2}},branchMap:{"0":{loc:{start:{line:4,column:4},end:{line:18,column:5}},type:"if",locations:[{start:{line:4,column:4},end:{line:18,column:5}},{start:{line:13,column:9},end:{line:18,column:5}}],line:4},"1":{loc:{start:{line:4,column:7},end:{line:4,column:33}},type:"binary-expr",locations:[{start:{line:4,column:7},end:{line:4,column:13}},{start:{line:4,column:17},end:{line:4,column:23}},{start:{line:4,column:27},end:{line:4,column:33}}],line:4},"2":{loc:{start:{line:5,column:8},end:{line:10,column:9}},type:"if",locations:[{start:{line:5,column:8},end:{line:10,column:9}},{start:{line:undefined,column:undefined},end:{line:undefined,column:undefined}}],line:5},"3":{loc:{start:{line:6,column:12},end:{line:8,column:13}},type:"if",locations:[{start:{line:6,column:12},end:{line:8,column:13}},{start:{line:undefined,column:undefined},end:{line:undefined,column:undefined}}],line:6},"4":{loc:{start:{line:13,column:9},end:{line:18,column:5}},type:"if",locations:[{start:{line:13,column:9},end:{line:18,column:5}},{start:{line:16,column:10},end:{line:18,column:5}}],line:13},"5":{loc:{start:{line:13,column:13},end:{line:13,column:39}},type:"binary-expr",locations:[{start:{line:13,column:13},end:{line:13,column:19}},{start:{line:13,column:23},end:{line:13,column:29}},{start:{line:13,column:33},end:{line:13,column:39}}],line:13}},s:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},f:{"0":0},b:{"0":[0,0],"1":[0,0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0,0]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"d02aaa346e13ba7bc16894a5ea172f0d191a50e0"};var coverage=global[gcv]||(global[gcv]={});if(!coverage[path]||coverage[path].hash!==hash){coverage[path]=coverageData;}var actualCoverage=coverage[path];{// @ts-ignore
cov_24n15z917s=function(){return actualCoverage;};}return actualCoverage;}cov_24n15z917s();// Your function to test
function testConditions(a,b,c){cov_24n15z917s().f[0]++;cov_24n15z917s().s[0]++;if((cov_24n15z917s().b[1][0]++,a==0)&&(cov_24n15z917s().b[1][1]++,b==1)||(cov_24n15z917s().b[1][2]++,c==2)){cov_24n15z917s().b[0][0]++;cov_24n15z917s().s[1]++;if(a==1){cov_24n15z917s().b[2][0]++;cov_24n15z917s().s[2]++;if(b==2){cov_24n15z917s().b[3][0]++;cov_24n15z917s().s[3]++;return true;}else{cov_24n15z917s().b[3][1]++;}cov_24n15z917s().s[4]++;return true;}else{cov_24n15z917s().b[2][1]++;}cov_24n15z917s().s[5]++;return true;}else{cov_24n15z917s().b[0][1]++;cov_24n15z917s().s[6]++;if((cov_24n15z917s().b[5][0]++,a==1)&&(cov_24n15z917s().b[5][1]++,b==2)||(cov_24n15z917s().b[5][2]++,c==3)){cov_24n15z917s().b[4][0]++;cov_24n15z917s().s[7]++;return true;}else{cov_24n15z917s().b[4][1]++;cov_24n15z917s().s[8]++;return false;}}}// module.exports = testConditions;
cov_24n15z917s().s[9]++;testConditions(0,1,2);