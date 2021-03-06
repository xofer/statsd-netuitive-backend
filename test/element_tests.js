var element = require('../netuitive/element');
var metric = require('../netuitive/metric');

module.exports = {
	constructor_sets_element_name_type_id: function(test) {
		test.expect(3);
		var e = new element.Element("Server", "foo");
		test.equal("Server", e.type);
		test.equal("foo", e.name);
		test.equal("foo", e.id);
		test.done();
	},
	add_metric_sample: function(test) {
		test.expect(7);
		var e = new element.Element("Server", "foo");
		var cpuIdle = new metric.Metric("cpu.idle");
		e.findOrCreateMetric(cpuIdle);
		e.addSample(1411395240000, "cpu.idle", 92.3);
		test.equal(1, e.metrics.length);
		test.equal(1, e.samples.length);

		var m = e.metrics[0];
		test.equal("cpu.idle", m.id);
		test.equal("cpu.idle", m.name);

		var sample = e.samples[0];
		test.equal("cpu.idle", sample.metricId);
		test.equal(1411395240000000, sample.timestamp);
		test.equal(92.3, sample.val);
		test.done();
	},
	add_multiple_samples_of_same_metric: function(test) {
		test.expect(4);
		var e = new element.Element("Server", "foo");
		var cpu = new metric.Metric("cpu.idle");
		e.findOrCreateMetric(cpu);
		e.addSample(1411395240000, "cpu.idle", 92.3);
		e.addSample(1411395240000, "cpu.idle", 82.3);
		test.equal(1, e.metrics.length);
		test.equal(2, e.samples.length);

		var m = e.metrics[0];
		test.equal("cpu.idle", m.id);
		test.equal("cpu.idle", m.name);
		test.done();
	},
    add_multiple_metrics_of_same_id: function(test) {
        test.expect(5);
        var e = new element.Element("Server", "foo");
        var m1 = new metric.Metric("cpu.idle");
        var m2 = new metric.Metric("cpu.idle");
        var m3 = e.findOrCreateMetric(m1);
        var m4 = e.findOrCreateMetric(m2);
        test.equal(m3, m1);
        test.equal(m4, m1);
        test.equal(1, e.metrics.length);

        var m = e.metrics[0];
        test.equal("cpu.idle", m.id);
        test.equal("cpu.idle", m.name);
        test.done();
    }
}
