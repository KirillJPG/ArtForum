import { Container } from "@/shared/ui/Container/Container";
import { Logo } from "@/shared/ui/Logo/Logo";
import { Avatar } from "../user";
import { Search } from "@/shared/ui/Search/Search";
import { rqClient } from "@/shared/api/instance";
import { LoadingIcon } from "@/shared/ui/Icons/LoadingIcon";
import { SearchIcon } from "@/shared/ui/Icons/SearchIcon";
import { Livenstein } from "@/shared/lib/Livenstein";

export default function Header(){
    Livenstein("gamfdbcbcvxbsdrebcvdnvcbvnrt3554xbsdrebcvxbsdrevxbsdre","g3mfdbcvxbsdrefgjldjfglksdjflgksdlkfrrer")
    return (
        <div className="py-2 shadow-md shadow-gray-100 ">
            <Container>
                <div className="grid grid-flow-col items-center">
                    <Logo/>
                    <div className="">
                        <SearchHeader/>
                    </div>
                    <div className="grid justify-end">
                        <Avatar/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

function SearchHeader(){
    const {isLoading} = rqClient.useQuery("get","/art")
    const icon = (isLoading ) ? <LoadingIcon/> : <SearchIcon/>
    return <Search className="w-full" placeholder="Search of arts" icon={icon}/>
}