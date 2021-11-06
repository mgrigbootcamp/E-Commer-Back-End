const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag
    .findAll({})
    .then((tags) => res.status(200).send(tags))
    .catch((error) => { res.status(400).send(error); });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag
    .findByPk(req.params.id, {})
    .then((tag) => {
      if (!tag) {
        return res.status(404).send({
          message: 'Tag Not Found',
        });
      }
      return res.status(200).send(tag);
    })
});

router.post('/', (req, res) => {
  // create a new tag
  /* req.body should look like this...
   {
     tag_name: "Basketball",
   }
 */
  Tag.create(req.body)
    .then((tag) => res.status(201).send(tag))
    .catch((error) => res.status(400).send(error));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  /* req.body should look like this...
  {
    tag_name: "Basketball",
  }
*/
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => res.json(updatedTag))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag
    .findByPk(req.params.id)
    .then(tag => {
      if (!tag) {
        return res.status(400).send({
          message: 'tag Not Found',
        });
      }
      return tag
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;
