<?php

namespace CoreBundle\Document\Repository;

use Doctrine\ODM\MongoDB\DocumentRepository;

/**
 * Class TodoRepository
 */
class TodoRepository extends DocumentRepository
{
    /**
     * Switch complete.
     * 
     * @param boolean $complete
     * @return array
     */
    public function switchComplete($complete)
    {
        $q = $this->createQueryBuilder()
                   ->update()
                   ->multiple(true)
                   ->field('complete')->set($complete)
                   ->getQuery();

        return $q->execute();
    }
}