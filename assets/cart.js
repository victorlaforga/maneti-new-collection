const addButton = document.querySelector('.cart-add-extra-product-btn')


fetch('/cart.js')
    .then(response => response.json())
    .then(async (data) => {

        const lightProduct = fetch('/products/maneti-ring-light.js')
            .then(response => response.json())
            .then(data => data);
        
        const cartItems = data.items

        const lightsInCart = cartItems.find(item => item.product_id === 5978437845152)
        
        if(lightsInCart == undefined) {
            console.log('No lights in cart')

            const options = await lightProduct
            const selectElement = document.createElement('select')
            console.log(options)
            options.options[0].values.forEach(colorOption => {
                console.log(colorOption)
                const option = document.createElement("option")
                option.value = colorOption
                option.id = colorOption
                option.innerHTML = colorOption
                selectElement.appendChild(option)

            })

            addButton.parentNode.insertBefore(selectElement, addButton)
            

            addButton.addEventListener('click', (e) => {
                e.preventDefault()
                const variant = options.variants.find(option => option.title === selectElement.options[selectElement.selectedIndex].id)
                
                let formData = {
                    'items': [{
                     'id': variant.id,
                     'quantity': 1
                     }]
                   };
                
                fetch('/cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const cartTable = document.querySelector('.cart-items')

                    const newItem = `<tr class="cart-item variant-${data.items[0].id} first last" data-cart-item-key="${data.items[0].key}" data-url="${data.items[0].url}">
                    <td class="cart-item-product cart-item-td">
                      <div class="cart-item-image-container">
                        <a class="cart-image" href="${data.items[0].url}">
                          
                        <img src="${data.items[0].featured_image.url}" alt="${data.items[0].featured_image.alt}"  class="cart-item-image">
            
                        </a>
                        <a class="cart-item-remove mobile-only" href="/cart/change?line=1&amp;quantity=0" data-cart-action="remove">
                          <span class="icon icon-cross"></span>
                        </a>
                      </div>
                      <div class="cart-item-product-wrap">
                        <span class="cart-title"><a href="${data.items[0].url}">${data.items[0].product_title}</a></span>
                        <span class="cart-vendor vendor">${data.items[0].vendor}</span>
                        
                          <span class="cart-variant">${data.items[0].variant_title}</span>
                        
            </div>
                    </td>
                    <td class="cart-item-price cart-item-td">
                      <span class="mobile-only cart-mobile-line-title">Prijs:</span>
                      <div class="cart-item-unit-price"><span class="cart-item-final-price money">€${data.items[0].price}</span>
                      </div>
                    </td>
                    <td class="cart-item-quantity cart-item-td">
                      <div class="number-input-wrapper cart-item-quantity-wrapper clearfix">
                        <div class="number-input-field">
                          <input type="number" id="cart-item-37608404189344:302c95ffe23588ec8c1e496c307f7611" name="updates[]" class="cart-item-quantity-display" value="1" size="1" aria-label="Hoeveelheid" data-cart-product-quantity="">
                          <label class="number-input-label" for="cart-item-37608404189344:302c95ffe23588ec8c1e496c307f7611">Hoeveelheid</label>
                        </div>
                        <div class="number-input-nav">
                          <div class="number-input-nav-item icon icon-plus cart-item-increase" data-cart-action="increment"></div>
                          <div class="number-input-nav-item icon icon-minus cart-item-decrease" data-cart-action="decrement"></div>
                        </div>
                      </div>
                    </td>
                    <td class="cart-item-total cart-item-td">
                      <span class="mobile-only cart-mobile-line-title">Totaal:</span>
                      <div class="cart-item-total-container">
                        
                        <span class="cart-item-final-price money">€${data.items[0].price}</span>
                        <a class="cart-item-remove" href="/cart/change?line=1&amp;quantity=0" data-cart-action="remove">
                          <span class="icon icon-cross"></span>
                        </a>
                      </div>
                    </td>
                  </tr>`;

                    console.log('cart items: ', data.items)

                    cartTable.insertAdjacentHTML('afterbegin', newItem)

                    console.log(cartTable)

                })
                .catch((error) => {
                    console.error('Error:', error)
                })
            })
        }
    });