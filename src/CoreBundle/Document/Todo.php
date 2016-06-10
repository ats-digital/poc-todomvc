<?php

namespace CoreBundle\Document;

/**
 * Todo
 */
class Todo
{
    /**
     * @var $id
     */
    protected $id;

    /**
     * @var string $content
     */
    protected $content;

    /**
     * @var boolean $complete 
     */
    protected $complete;

    /**
     * Get id
     *
     * @return int $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set content
     *
     * @param string $content
     * @return self
     */
    public function setContent($content)
    {
        $this->content = $content;
        return $this;
    }

    /**
     * Get content
     *
     * @return string $content
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set complete
     *
     * @param string $complete
     * @return self
     */
    public function setComplete($complete)
    {
        $this->complete = $complete;
        return $this;
    }

    /**
     * Get complete
     *
     * @return string $complete
     */
    public function getComplete()
    {
        return $this->complete;
    }
}