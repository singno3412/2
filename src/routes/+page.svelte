<script>
    let res;
    let name;
    let price;
    let roomNum;
    let roomType;
    let roomStatus;
    let roomPrice;
    let category;
    let product;
	let statedata;
    async function addRoom(rN, rP, rT) {
        let dat = [
            {'Name':rN.toUpperCase(),'Type':rT,'Price':rP}
        ]
        const response = await fetch("/api/insertState", {
            method: 'POST',
            body: JSON.stringify({dat}),
            headers: {
                'content-type': 'application/json'
            }
        
        });
        res =  await response.json();
        statedata = res;
        console.log('State Dat',statedata)
        location.reload();
    }
    async function updateRoom(rN, rP, rT, rS, id) {
        let dat = [
            {'Name':rN.toUpperCase(),'Type':rT,'Price':rP,'Status':rS, 'ID':id}
        ]
        const response = await fetch("/api/updateState", {
            method: 'POST',
            body: JSON.stringify({dat}),
            headers: {
                'content-type': 'application/json'
            }
        
        });
        res =  await response.json();
        statedata = res;
        console.log('State Dat',statedata)
        location.reload();
        
    }
	async function xget(st) {
        const response = await fetch("/api/getstate", {
            method: 'POST',
            body: JSON.stringify({st}),
            headers: {
                'content-type': 'application/json'
            }
        
        });
        res =  await response.json();
        statedata = res;
        console.log('State Dat',statedata)

	}
	export let data;
    // console.log(data)
</script>
<button data-modal-target="Add-room" data-modal-toggle="Add-room" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Add Room
  </button>
<div class=" grid grid-cols-3 gap-2 p-5">
{#each data.data as dat}
    <div class="container bg-white rounded-lg border-2 border-solid mt-3 mx-auto p-3  shadow-lg">
        <div>               
             <button data-modal-target="crud-modal{dat.room_number}" data-modal-toggle="crud-modal{dat.room_number}"  class=" float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
            แก้ไขห้อง
          </button>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>ห้อง {dat.room_number} ประเภท {dat.room_type} ราคา {dat.rate_per_night} บาท</a>  <br>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>สถานะห้อง 
                {#if dat.status == 'Available'}
                <a class=" text-green-500">ว่าง</a>
                {:else}
                <a class=" text-red-500">จองแล้ว</a>
                {/if}

        </div>
        <p class="">{JSON.stringify(dat)}</p>
    </div>
    
    <!-- Modal Main -->
    <div id="crud-modal{dat.room_number}" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        อัปเดตห้องหมายเลข {dat.room_number}
                    </h3>
                    <button on:click={() => location.reload()} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal{dat.room_number}">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input bind:value={dat.room_number}  type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input bind:value={dat.rate_per_night} type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="">
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select id="category" bind:value={dat.room_type} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected="Single">Select category</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Vip/Small">Vip/Small</option>
                                <option value="Vip/Big">Vip/Big</option>
                            </select>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="Status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                            <select id="Status" bind:value={dat.status} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected="Available">Available</option>
                                <option value="Reserved">Reserved</option>
                            </select>
                        </div>
                    </div>
                    <button on:click={updateRoom(dat.room_number, dat.rate_per_night, dat.room_type, dat.status, dat.room_id)} type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        Add new product
                    </button>
                </form>
            </div>
        </div>
    </div> 
{/each}
</div>




  <!-- Add room -->
  <div id="Add-room" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                     Add Room
                  </h3>
                  <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="Add-room">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </div>
              <!-- Modal body -->
              <form class="p-4 md:p-5">
                  <div class="grid gap-4 mb-4 grid-cols-2">
                      <div class="col-span-2">
                          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room number</label>
                          <input  bind:value={roomNum} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                          <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price / night</label>
                          <input bind:value={roomPrice} type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="">
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                          <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Type</label>
                          <select bind:value={roomType} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                              <option selected="Single">Select category</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Vip/Small">Vip/Small</option>
                                <option value="Vip/Big">Vip/Big</option>
                          </select>
                      </div>
                  </div>
                  <button on:click={addRoom(roomNum,roomPrice,roomType)} class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                      Add new product
                  </button>
              </form>
          </div>
      </div>
  </div> 
  

<!-- MAIN -->
