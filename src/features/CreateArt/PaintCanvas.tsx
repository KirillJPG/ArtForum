export function PaintCanvas(){
    return (
        <div className="grid grid-flow-col gap-5">
            <SidePaint/>
            <BodyPaint/>
        </div>
    )
}

function BodyPaint(){
    return <div className="">
        <Canvas/>
    </div>
}

function Canvas(){
 return (
    <div className="">

    </div>
 )
}

function SidePaint(){
 return <div className="">
    <Pallete/>
 </div>
}


function Pallete(){
    return(
        <div className=""></div>
    )
}