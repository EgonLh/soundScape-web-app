export default function OrderDetail({data:any}) {
    return (<div>
        This is Order Detail
        <Order/>
    </div>)
}

export const Order = ({order:String})=>{
    return (<div>
        This is order
    </div>)
}