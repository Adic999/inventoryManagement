import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ItemRender from './ItemRender';
import { getShopItems } from '../functions/shopFunction';
import { useSelector } from 'react-redux';
import FunctionForm from './functionForm/FunctionForm';

const Container = styled.div`
    padding: 20px;
    height: 85vh;
`
const Wrapper = styled.div`
    border: 1px solid black;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`
const TopContainer = styled.div`
  border: 1px solid black;
  height: 59%;
  width: 100%;
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  padding: 2px;
`
const Sort = styled.select`
  width: 20%;
  cursor: pointer;
`
const Option = styled.option`
  
`
const SearchContainer = styled.div`
  border: 1px solid black;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const SearchInput = styled.input`
  height: 100%;
  width: 80%;
  border: none;
  padding: 0px 5px;
  font-size: 15px;
`
const Button = styled.button`
  height: 100%;
  width: 30%;
  border: none;
  margin: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: green;
  cursor: pointer;
`
const ItemsContainer = styled.div`
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(5vh ,fit-content);
  overflow-y: scroll;
  grid-row-gap: 5%;
  height: 100%;
`

const BottomContainer = styled.div`
  border: 1px solid black;
  height: 39%;
  width: 100%;
`

const ShopComponent = () => {

  const [filterInput , setFilterInput] = useState("")
  const [filteredList, setFilteredList] = useState([])
  const [sortOption, setSortOption] = useState("")
  const [userItems, setUserItems] = useState([])

  const token = useSelector(state=> state.token)

  useEffect(()=>{
    filterFunction()
  },[filterInput,userItems,sortOption])

  const handleInput = (e)=>{
    setFilterInput(e.target.value)
    filterFunction()
  }


  async function filterFunction(){
    // getting user items from the database 
    let items = await getShopItems(token.token)
    
    // if everything goes well
   if(items !== "Not authorized" && items !== "NO ITEMS FOUND"){
      items = items.map(item=>{
      const splitedDate = item.createdAt.split("T")
      item.createdAt = splitedDate[0]
      return item
    })
    // copying the data from the userItem state to perform filter functions
    
    const copyData = [...items]
    copyData.sort((a, b)=>{
      if(sortOption==="amount dec"){
      return b.amount - a.amount
    }else if(sortOption === "costPrice dec"){
      return b.costPrice - a.costPrice
    }else if(sortOption === "sellPrice dec"){
      return b.sellPrice - a.sellPrice
    }else if(sortOption === "time dec"){
      return new Date(a.createdAt) - new Date(b.createdAt)
    }else if(sortOption === "amount asc"){
      return a.amount - b.amount
    }else if(sortOption === "costPrice asc"){
      return a.costPrice - b.costPrice
    }else if(sortOption === "sellPrice asc"){
      return a.sellPrice - b.sellPrice
    }else if(sortOption === "time asc"){
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    else{
      return a && b
    }
    })
    const filtered = copyData.filter(item=>{
      if(filterInput === ""){
        return item
      }else{
        if(item.name.toLowerCase().includes(filterInput.toLowerCase())){
          return item
        }
      }
    }
    )
    setFilteredList(filtered)
  }
  }
  
  const handleSort=(e)=>{
    setSortOption(e.target.value)
  }

  return (
    <Container>
      <Wrapper>
        <TopContainer>
          <FilterContainer>
            <Sort value={sortOption} onChange={handleSort}>
              <Option value="amount asc" >amount asc</Option>
              <Option value="costPrice asc">Cost Price asc</Option>
              <Option value="sellPrice asc">Sell Price asc </Option>
              <Option value="time asc">time asc </Option>
              <Option value="amount dec" >amount dec</Option>
              <Option value="costPrice dec">Cost Price dec</Option>
              <Option value="sellPrice dec">Sell Price dec</Option>
              <Option value="time dec">time dec</Option>
              </Sort>
            <SearchContainer>
              <SearchInput placeholder='search' onChange={handleInput} value={filterInput}/>
              <Button>
              <SearchOutlinedIcon/>
              </Button>
            </SearchContainer>
          </FilterContainer>
          <ItemsContainer>
            {filteredList.map(item=>{
              return <ItemRender key={item.name} id={item._id} name={item.name} amount={item.amount} costPrice={item.costPrice} sellPrice={item.sellPrice} seller={item.seller} date={item.createdAt} />
            })}
          </ItemsContainer>
        </TopContainer>
        <BottomContainer>
          <FunctionForm userItems={userItems} setUserItems={setUserItems}/>
        </BottomContainer>
      </Wrapper>
    </Container>
  )
}

export default ShopComponent
