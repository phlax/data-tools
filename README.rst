data-tools
==========

A browser addon for data wrangling.

- Parse data from a page into json/table


|build| |coverage|


Development install
-------------------

First install `makeyfile <http://github.com/phlax/makeyfile/>`_. (you may want to do this in a virtualenv)

.. code-block:: console

  $ pip install -e git+https://github.com/phlax/makeyfile#egg=makeyfile


Next, fetch the ``data-tools`` repo

.. code-block:: console

  $ git clone git@github.com:phlax/data-tools
  $ cd data-tools


Now you can setup your environment (npm/webpack)

.. code-block:: console

  $ makey setup



Development usage
-----------------

You can run a sandboxed firefox with the plugin like so


.. code-block:: console

  $ makey firefox-ext


To specify a custom version of firefox, you can pass the ``-f`` flag

.. code-block:: console

  $ makey firefox-ext -f /path/to/my/firefox


Running webpack with ``watch``
------------------------------

While developing its useful to have your javascript assets rebuilt
whenever you make changes.

You can do so with:

.. code-block:: console

  $ makey webpack -w


.. |build| image:: https://img.shields.io/travis/phlax/data-tools/master.svg?style=flat-square
        :alt: Build Status
        :target: https://travis-ci.org/phlax/data-tools/branches


.. |coverage| image:: https://img.shields.io/codecov/c/github/phlax/data-tools/master.svg?style=flat-square
        :target: https://codecov.io/gh/phlax/data-tools/branch/master
        :alt: Test Coverage
