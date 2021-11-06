const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll ({
    include: [{
      model: Product,
      as: 'products'
    }]
  })
  .then ((results)=>{
    res.json(results)
  })
  .catch ((err)=> {
    console.log(err);
  })
  
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category
    .findByPk(req.params.id, {
      include: [{
        model: Product,
        as: 'products'
      }],
    })
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: 'Category Not Found',
        });
      }
      return res.status(200).send(category);
    })
    .catch((error) => res.status(400).send(error));
});

router.post('/', (req, res) => {
  // req.body
  // create a new category
  /* req.body should look like this...
   {
     category_name: "Basketball",
   }
 */
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  /* req.body should look like this...
   {
     category_name: "Basketball",
   }
 */
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategory) => res.json(updatedCategory))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category
    .findByPk(req.params.id)
    .then(category => {
      if (!category) {
        return res.status(400).send({
          message: 'Category Not Found',
        });
      }
      return category
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;
