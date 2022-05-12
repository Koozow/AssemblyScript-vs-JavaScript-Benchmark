const Benchmark = require("benchmark");
const wasm = require(".");

function runSuite(suite) {
    console.log("Running", suite.name, "function")

    suite
        .on("cycle", (event) => {           
             console.log('Testing with ' + event.target.name);

             console.log('Number of times the Test was executed:  ' + event.target.count);
            
             console.log('Number of of Cycles were Performed:  '+ event.target.cycles);
        
             console.log('Number of executions per Sec:  '+ event.target.hz + ' ops/sec');
             

        })
        .on("complete", function (event) {
        
        console.log(this.filter('fastest').map('name') + ' won');

        console.log(this.filter('slowest').map('name') + ' lost');

        })
        .run({ 'async': true });
}

function addSmallTest() {
    function addJs(a, b) {
        return a + b;
    }
    const addAs = wasm.add;

    const testSmall = Benchmark.Suite("addSmall");

    testSmall
        .add("AssemblyScript", function () {
            addAs(10000, 20000);
        })
        .add("JavaScript", function () {
            addJs(10000, 20000);
        })
    runSuite(testSmall);
}

function addLargeTest() {
    function addJs(a, b) {
        return a + b;
    }
    const addAs = wasm.add;

    const testLarge = Benchmark.Suite("addLarge");

    testLarge
        .add("AssemblyScript", function () {
            addAs(1000000000000000, 8192000000000000);
        })
        .add("JavaScript", function () {
            addJs(1000000000000000, 8192000000000000);
        })
    runSuite(testLarge);
}

function factorialSmallTest() {
    function factorialJs(i) {
        return i == 0 ? 1 : i * factorialJs(i - 1);
    }
    const factorialAs = wasm.factorial;

    const testSmall = Benchmark.Suite("factorialSmall");

    testSmall
        .add("AssemblyScript", function () {
            factorialAs(27);
        })
        .add("JavaScript", function () {
            factorialJs(27);
        })
    runSuite(testSmall);

}

function factorialargeTest(){
    function factorialJs(i) {
        return i == 0 ? 1 : i * factorialJs(i - 1);
    }
    const factorialAs = wasm.factorial;
    const testLarge = Benchmark.Suite("factorialLarge");

    testLarge
        .add("AssemblyScript", function () {
            factorialAs(2700);
        })
        .add("JavaScript", function () {
            factorialJs(2700);
        })
    runSuite(testLarge);
}

function squareArraySmallTest() {
    function squareArrayJs(arr) {
        const len = arr.length;
        const result = new Int32Array(len);
        for (let i = 0; i < len; ++i) {
            const e = arr[i];
            result[i] = e * e;
        }
        return result;
    }
    const squareArrayAs = wasm.squareArray;

    const testSmall = Benchmark.Suite("squareArraySmall");

    testSmall
        .add("AssemblyScript", function () {
            squareArrayAs([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
        })
        .add("JavaScript", function () {
            squareArrayJs([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
        })
    runSuite(testSmall);

}
function squareArrayLargeTest() {
    function squareArrayJs(arr) {
        const len = arr.length;
        const result = new Int32Array(len);
        for (let i = 0; i < len; ++i) {
            const e = arr[i];
            result[i] = e * e;
        }
        return result;
    }
    const squareArrayAs = wasm.squareArray;
    const testLarge = Benchmark.Suite("squareArrayLarge");
    const largearray = new Int32Array(270000).fill(1).map((val, i) => val + (i * 1))
    console.log(largearray);
    testLarge
        .add("AssemblyScript", function () {
            squareArrayAs(largearray);
        })
        .add("JavaScript", function () {
            squareArrayJs(largearray);
        })
    runSuite(testLarge);

}


function squareArrayGenSmallTest() {

    function squareArrayGenJs(len) {
        const arr = new Int32Array(len).map((_, i) => i+1);
        const result = new Int32Array(len);
        
        for (let i = 0; i < len; ++i) {
            const e = arr[i];
            result[i] = e * e;
        }
        
        return result;
    }
   
   
    const squareArrayGenAs = wasm.squareArrayGen;

    const arraySmallTest = new Benchmark.Suite("squareArrayGenSmall");
    
    arraySmallTest
        .add("AssemblyScript", function () {
            squareArrayGenAs(27);
            ;
        })
        
        .add("JavaScript", function () {
            squareArrayGenJs(27);
        });
    runSuite(arraySmallTest);
}

function squareArrayGenLargeTest() {

    function squareArrayGenJs(len) {
        const arr = new Int32Array(len).map((_, i) => i+1);
        const result = new Int32Array(len);
        for (let i = 0; i < len; ++i) {
            const e = arr[i];
            result[i] = e * e;
        }
        
        return result;
    }
    const squareArrayGenAs = wasm.squareArrayGen
    const arrayLargeTest = new Benchmark.Suite("squareArrayGenLarge");

    arrayLargeTest
        .add("AssemblyScript", function () {
            squareArrayGenAs(270000);
        })
        .add("JavaScript", function () {
            squareArrayGenJs(270000);
        });
    runSuite(arrayLargeTest);
}

//addSmallTest();
//addLargeTest();
//factorialSmallTest();
//factorialargeTest();
//squareArraySmallTest();
//squareArrayLargeTest();
//squareArrayGenSmallTest();
squareArrayGenLargeTest();

