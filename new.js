module sr_latch(Q, Qbar, S, R,clk);
//Port declarations
output Q, Qbar;
input S, R,clk;
wire x,y;
//Instantiate lower level modules
//In this case, instantiate Verilog primitive "nand" gates 
// Note, how the wires are connected in a cross coupled fashion. 
and a1(x,R,clk);
and a2(y,S,clk);
nor n1 (Q, R, Qbar);
nor n2(Qbar, S, Q);
// endmodule statement
endmodule

module clockGenerator(clk);
output clk;
reg clk;
initial
begin
clk=0;
#30 $finish;
end
always
#5 clk = ~clk;
endmodule

module Top;

// Declarations of wire, reg and other variables
wire q, qbar;
reg set, reset;

//Instantiate lower level modules //In this case, instantiate SR_latch 
sr_latch s1(q, qbar, set, reset,clk); 

// Behavioral block, initial

initial

begin

$monitor($time, "clk= %b,set=%b, reset=%b, q=%b, qbar=%b\n",clk,set,reset,q,qbar);
set=0; reset  =0;

#2 set = 0; reset = 1;

#2 set = 0; reset = 0;

#2 set = 1; reset =0;

#2 set = 0; reset = 1;

// Uncomment the following two statements one af // to see a problem with non-deterministic behavior

#2 set = 0; reset = 0;

#2 set = 1; reset = 0;

end

// endmodule statement 
endmodule



#4 dataln[0] = 0; dataln [1] = 0; dataln [2] = 0; dataln[3] = 0;
#1 $display(" time = %d, clk= %b, dataln[0-4] = %b%b%b%b,dataOut[0-4]= %b%b%b%b\n",
$time, clk, dataln[0], dataln[1],dataln[2], dataln[3], dataOut[0], dataOut[1], dataOut(21, dataOut /31).:
#3 dataln[0] = 0; dataln[1] = 1; dataln[2] = 1; dataln[3] = 0; clear = 0;
#1 display(" time = %d, clk- %b, dataln[0-4] = %b%b%b%b,dataOut(0-41= %b%b%b%b\n",
$time, clk,dataln[0], dataln [1],dataln[2], dataln[3],dataOut[0], dataOut[1],dataOut[2], dataOut[3]);
#3 dataln[0] = 1; dataln[1] = 0; dataln[2] = 0; dataln[3] = 1;
#1 display(" time = %d, clk= %b, dataln[0-4] = %b%b%b%b, dataOut[0-4]= %b%b%b%b\n",
$time, clk, dataln [0], dataln[1], dataln [2], dataln [3], dataOut[0], dataOut [1], dataOut[2], dataOut[3]);
#3 dataln[0] = 1; dataln[1] = 1; dataln[2] = 1; dataln[3] = 1;