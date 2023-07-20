jQuery.fn.extend({
  createRepeater: function (options = {}) {
    const hasOption = function (optionKey) {
      return options.hasOwnProperty(optionKey)
    }

    const option = function (optionKey) {
      return options[optionKey]
    }

    const generateId = function (string) {
      return string.replace(/\[/g, '_').replace(/\]/g, '').toLowerCase()
    }

    const addItem = function (items, key, fresh = true) {
      const itemContent = items
      const group = itemContent.data('group')
      const item = itemContent
      const input = item.find('input,select,textarea')

      input.each(function (index, el) {
        const attrName = $(el).data('name')
        const skipName = $(el).data('skip-name')
        if (skipName != true) {
          $(el).attr('name', group + '[' + key + ']' + '[' + attrName + ']')
        } else {
          if (attrName != 'undefined') {
            $(el).attr('name', attrName)
          }
        }
        if (fresh == true) {
          $(el).attr('value', '')
        }

        $(el).attr('id', generateId($(el).attr('name')))
        $(el)
          .parent()
          .find('label')
          .attr('for', generateId($(el).attr('name')))
      })

      const itemClone = items

      /* Handling remove btn */
      const removeButton = itemClone.find('.remove-btn')

      if (key == 0) {
        removeButton.attr('disabled', true)
      } else {
        removeButton.attr('disabled', false)
      }

      removeButton.attr('onclick', "$(this).parents('.items').remove()")

      const newItem = $("<div class='items'>" + itemClone.html() + '<div/>')
      newItem.attr('data-index', key)

      newItem.appendTo(repeater)
    }

    /* find elements */
    var repeater = this
    const items = repeater.find('.items')
    let key = 0
    const addButton = repeater.find('.repeater-add-btn')

    items.each(function (index, item) {
      items.remove()
      if (
        hasOption('showFirstItemToDefault') &&
        option('showFirstItemToDefault') == true
      ) {
        addItem($(item), key)
        key++
      } else {
        if (items.length > 1) {
          addItem($(item), key)
          key++
        }
      }
    })

    /* handle click and add items */
    addButton.on('click', function () {
      addItem($(items[0]), key)
      key++
    })
  }
})
